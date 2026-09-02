-- ============================================================================
-- StatSkill AI + iGOT Karmayogi — Incremental Supabase Migration Script
-- Copy and paste this single script into your Supabase SQL Editor.
-- (Uses text casting for new enum values to prevent PostgreSQL 55P04 transaction errors)
-- ============================================================================

-- 1. UPDATE ENUMS (Add new role values safely)
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'TRAINER';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'DEPARTMENT_ADMIN';

DO $$ BEGIN
    CREATE TYPE evidence_type AS ENUM ('Diagnostic Assessment', 'Quiz Performance', 'Practical Task', 'Course Completion');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 2. ALTER EXISTING TABLES (Add missing columns)
-- ============================================================================

ALTER TABLE public.user_competencies 
    ADD COLUMN IF NOT EXISTS confidence_score NUMERIC(5, 2) DEFAULT 92.00;

ALTER TABLE public.mcq_questions 
    ADD COLUMN IF NOT EXISTS source_section TEXT;

-- ============================================================================
-- 3. CREATE NEW TABLES
-- ============================================================================

-- ROLE COMPETENCY BENCHMARKS
CREATE TABLE IF NOT EXISTS public.role_competencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_title TEXT NOT NULL,
    competency_id UUID NOT NULL REFERENCES public.competencies(id) ON DELETE CASCADE,
    target_level NUMERIC(5, 2) NOT NULL DEFAULT 80.00 CHECK (target_level >= 0 AND target_level <= 100),
    CONSTRAINT role_comp_unique UNIQUE (role_title, competency_id)
);

-- EVIDENCE LEDGER (Proof of Competency Score)
CREATE TABLE IF NOT EXISTS public.evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    competency_id UUID NOT NULL REFERENCES public.competencies(id) ON DELETE CASCADE,
    evidence_type evidence_type NOT NULL DEFAULT 'Diagnostic Assessment',
    title TEXT NOT NULL,
    score NUMERIC(5, 2) NOT NULL,
    details TEXT,
    date_assessed TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SKILL GAPS & PRIORITY
CREATE TABLE IF NOT EXISTS public.skill_gaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    competency_id UUID NOT NULL REFERENCES public.competencies(id) ON DELETE CASCADE,
    gap NUMERIC(5, 2) NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('Critical', 'High', 'Medium', 'Low')),
    recommended_hours INT NOT NULL DEFAULT 8,
    priority_reason TEXT,
    ai_explanation TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- DEPARTMENT INTERVENTIONS (Decision Support for Department Admins)
CREATE TABLE IF NOT EXISTS public.department_interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department TEXT NOT NULL,
    top_skill_gaps TEXT[] DEFAULT ARRAY[]::TEXT[],
    affected_learner_count INT NOT NULL DEFAULT 0,
    suggested_training TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('Critical', 'High', 'Medium')),
    ai_summary TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FUTURE SKILL READINESS
CREATE TABLE IF NOT EXISTS public.future_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    current_readiness NUMERIC(5, 2) NOT NULL DEFAULT 30.00,
    target_readiness NUMERIC(5, 2) NOT NULL DEFAULT 75.00,
    gap NUMERIC(5, 2) GENERATED ALWAYS AS (GREATEST(0, target_readiness - current_readiness)) STORED,
    reason TEXT NOT NULL,
    target_roles TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- ============================================================================
-- 4. INDEXES FOR NEW TABLES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_evidence_user ON public.evidence(user_id);
CREATE INDEX IF NOT EXISTS idx_evidence_comp ON public.evidence(competency_id);
CREATE INDEX IF NOT EXISTS idx_skill_gaps_user ON public.skill_gaps(user_id);
CREATE INDEX IF NOT EXISTS idx_dept_interventions_dept ON public.department_interventions(department);

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) FOR NEW TABLES
-- (Uses role::text comparison to prevent PostgreSQL 55P04 uncommitted enum value error)
-- ============================================================================

ALTER TABLE public.role_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_gaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.department_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.future_skills ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Anyone authenticated can view role competencies"
        ON public.role_competencies FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can view their own evidence or admins view all"
        ON public.evidence FOR SELECT USING (user_id = auth.uid() OR EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role::text IN ('TRAINER', 'DEPARTMENT_ADMIN', 'SYSTEM_ADMIN', 'TRAINING_ADMIN')
        ));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can manage their own skill gaps"
        ON public.skill_gaps FOR ALL USING (user_id = auth.uid() OR EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role::text IN ('TRAINER', 'DEPARTMENT_ADMIN', 'SYSTEM_ADMIN', 'TRAINING_ADMIN')
        ));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Anyone authenticated can read department interventions"
        ON public.department_interventions FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Anyone authenticated can read future skills"
        ON public.future_skills FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ============================================================================
-- 6. SEED DATA FOR NEW TABLES
-- ============================================================================

INSERT INTO public.future_skills (skill_name, category, current_readiness, target_readiness, reason, target_roles) VALUES
    ('Automated Survey Imputation via Machine Learning', 'AI & Modern Analytics', 25.00, 75.00, 'MoSPI modern data architecture strategy requires replacing manual rule-based unit non-response imputation with Random Forest & XGBoost pipelines by Q4 2026.', ARRAY['Statistical Officer', 'Data Analyst']),
    ('High-Frequency Satellite Nightlight Analytics', 'Geospatial & Big Data', 30.00, 70.00, 'Required for supplementary district-level GDP proxy calculations between decennial economic census rounds.', ARRAY['GIS Specialist', 'Economic Analyst']),
    ('Differential Privacy & Confidential Compute for Microdata', 'Data Security & Governance', 45.00, 80.00, 'Compliance with Digital Personal Data Protection (DPDP) Act for public release of socio-economic survey microdata.', ARRAY['Data Custodian', 'Statistical Officer'])
ON CONFLICT (skill_name) DO NOTHING;

INSERT INTO public.department_interventions (department, top_skill_gaps, affected_learner_count, suggested_training, priority, ai_summary) VALUES
    ('National Sample Survey Office (NSSO)', ARRAY['AI & Machine Learning (40% Deficit)', 'Survey Methodology (37% Deficit)'], 420, 'NSSTA CAPI & Imputation Protocol Workshop', 'Critical', 'The Survey Division shows a critical cluster gap in CAPI digital field validation and ML-assisted survey non-response imputation. Implementing an institutional workshop at NSSTA will improve field data accuracy by an estimated 28 percentage points across 420 officers.'),
    ('Economic Statistics Division (ESD)', ARRAY['Statistical Forecasting (35% Deficit)', 'Price Indices (33% Deficit)'], 280, 'Laspeyres Base Revisions & Time Series Masterclass', 'High', 'Economic Statistics officers require targeted elevation in quarterly Consumer Price Index (CPI) basket weighting and seasonal ARIMA adjustments prior to the upcoming base year update.')
ON CONFLICT DO NOTHING;
