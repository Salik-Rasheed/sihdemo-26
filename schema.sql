-- ============================================================================
-- StatSkill AI + iGOT Karmayogi Integration — Supabase Database Schema
-- Project: SIH 2026 / Ministry of Statistics & Programme Implementation (MoSPI)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ENUMS & CONSTANTS
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('LEARNER', 'TRAINER', 'DEPARTMENT_ADMIN', 'SYSTEM_ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE competency_category AS ENUM ('Statistical', 'Technical', 'Digital', 'Managerial');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE competency_status AS ENUM ('STRONG', 'MODERATE', 'NEEDS_IMPROVEMENT', 'CRITICAL');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE course_level AS ENUM ('Basic', 'Intermediate', 'Advanced', 'Expert');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE course_type AS ENUM ('Self-Paced', 'Interactive Workshop', 'Micro-Credential', 'Blended Training');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE integration_mode AS ENUM ('PROTOTYPE_DEMO', 'API_READY', 'LIVE_AUTHORIZED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE auth_mechanism AS ENUM ('OAuth 2.0', 'API Key', 'Bearer Token');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE document_status AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE question_status AS ENUM ('APPROVED', 'NEEDS_REVIEW', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE sync_status AS ENUM ('Success', 'Partial Failure', 'Failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE evidence_type AS ENUM ('Diagnostic Assessment', 'Quiz Performance', 'Practical Task', 'Course Completion');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 2. TABLES DEFINITIONS
-- ============================================================================

-- PROFILES (Links with Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    employee_id TEXT UNIQUE NOT NULL,
    department TEXT NOT NULL DEFAULT 'National Sample Survey Office (NSSO)',
    designation TEXT NOT NULL DEFAULT 'Statistical Officer',
    organization TEXT NOT NULL DEFAULT 'Ministry of Statistics & Programme Implementation',
    years_of_experience INT NOT NULL DEFAULT 6,
    role user_role NOT NULL DEFAULT 'LEARNER',
    avatar_url TEXT,
    learning_goal TEXT DEFAULT 'Master Survey Methodology, Python automation, and AI/ML for socio-economic survey rounds.',
    existingSkills TEXT[] DEFAULT ARRAY['Survey Sampling', 'Data Collection', 'Excel', 'Basic R'],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- COMPETENCIES CATALOG
CREATE TABLE IF NOT EXISTS public.competencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category competency_category NOT NULL DEFAULT 'Statistical',
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ROLE COMPETENCY BENCHMARKS
CREATE TABLE IF NOT EXISTS public.role_competencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_title TEXT NOT NULL,
    competency_id UUID NOT NULL REFERENCES public.competencies(id) ON DELETE CASCADE,
    target_level NUMERIC(5, 2) NOT NULL DEFAULT 80.00 CHECK (target_level >= 0 AND target_level <= 100),
    CONSTRAINT role_comp_unique UNIQUE (role_title, competency_id)
);

-- USER COMPETENCIES (Live Officer Profiling)
CREATE TABLE IF NOT EXISTS public.user_competencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    competency_id UUID NOT NULL REFERENCES public.competencies(id) ON DELETE CASCADE,
    current_level NUMERIC(5, 2) NOT NULL DEFAULT 50.00 CHECK (current_level >= 0 AND current_level <= 100),
    target_level NUMERIC(5, 2) NOT NULL DEFAULT 80.00 CHECK (target_level >= 0 AND target_level <= 100),
    gap NUMERIC(5, 2) GENERATED ALWAYS AS (GREATEST(0, target_level - current_level)) STORED,
    status competency_status NOT NULL DEFAULT 'MODERATE',
    confidence_score NUMERIC(5, 2) NOT NULL DEFAULT 92.00,
    last_assessed TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT user_competency_unique UNIQUE (user_id, competency_id)
);

-- EVIDENCE LEDGER (Proof of Competency Level)
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

-- iGOT KARMAYOGI COURSES CATALOG
CREATE TABLE IF NOT EXISTS public.igot_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    competency TEXT NOT NULL,
    level course_level NOT NULL DEFAULT 'Intermediate',
    duration TEXT NOT NULL DEFAULT '4 hours',
    language TEXT NOT NULL DEFAULT 'English',
    match_score NUMERIC(5, 2) NOT NULL DEFAULT 85.00,
    source TEXT NOT NULL DEFAULT 'Prototype iGOT Resource Mapping',
    description TEXT,
    learning_objectives TEXT[] DEFAULT ARRAY[]::TEXT[],
    provider TEXT NOT NULL DEFAULT 'National Statistical Systems Training Academy (NSSTA)',
    deep_link_url TEXT,
    course_type course_type NOT NULL DEFAULT 'Self-Paced',
    role_target TEXT[] DEFAULT ARRAY['Statistical Officer', 'Economic Officer', 'Data Analyst'],
    recommendation_reason TEXT,
    enrolled_count INT NOT NULL DEFAULT 120,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 4.70,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- COMPETENCY MAPPING RECORDS (StatSkill AI <-> iGOT Taxonomy)
CREATE TABLE IF NOT EXISTS public.competency_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stat_skill_competency TEXT NOT NULL,
    igot_competency TEXT NOT NULL,
    match_percentage NUMERIC(5, 2) NOT NULL DEFAULT 90.00,
    domain TEXT NOT NULL DEFAULT 'Statistical Operations',
    last_mapped TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'Mapped' CHECK (status IN ('Mapped', 'Pending Review', 'Auto-Aligned'))
);

-- USER LEARNING PATHS (Personalized AI Roadmaps)
CREATE TABLE IF NOT EXISTS public.user_learning_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    topic TEXT NOT NULL,
    target_competency TEXT NOT NULL,
    aligned_course_id TEXT REFERENCES public.igot_courses(course_id) ON DELETE SET NULL,
    course_title TEXT,
    duration TEXT,
    why_recommended TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- DOCUMENT UPLOADS (RAG Curriculum Documents for Trainer Studio)
CREATE TABLE IF NOT EXISTS public.document_uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    file_size TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    pages_count INT NOT NULL DEFAULT 1,
    topics_count INT NOT NULL DEFAULT 0,
    key_concepts_count INT NOT NULL DEFAULT 0,
    learning_objectives_count INT NOT NULL DEFAULT 0,
    extracted_topics TEXT[] DEFAULT ARRAY[]::TEXT[],
    extracted_concepts TEXT[] DEFAULT ARRAY[]::TEXT[],
    mapped_competency TEXT,
    status document_status NOT NULL DEFAULT 'PROCESSING'
);

-- MCQ QUESTIONS (AI Generated Grounded Questions with Trainer Editing)
CREATE TABLE IF NOT EXISTS public.mcq_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES public.document_uploads(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_index INT NOT NULL CHECK (correct_index >= 0),
    explanation TEXT,
    source_document TEXT,
    source_page INT DEFAULT 1,
    source_section TEXT,
    competency TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'Medium' CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    confidence_score NUMERIC(5, 2) NOT NULL DEFAULT 92.00,
    status question_status NOT NULL DEFAULT 'APPROVED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- QUIZ RESULTS & ASSESSMENT LOGS
CREATE TABLE IF NOT EXISTS public.quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    quiz_id TEXT NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    passed BOOLEAN NOT NULL,
    competency_before NUMERIC(5, 2) NOT NULL,
    competency_after NUMERIC(5, 2) NOT NULL,
    improvement_points NUMERIC(5, 2) NOT NULL,
    breakdown JSONB DEFAULT '[]'::JSONB,
    ai_next_recommendation TEXT,
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

-- INTEGRATION & SYNC AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.sync_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    operation TEXT NOT NULL,
    records_synced INT NOT NULL DEFAULT 0,
    records_failed INT NOT NULL DEFAULT 0,
    status sync_status NOT NULL DEFAULT 'Success',
    details TEXT
);

-- INTEGRATION SETTINGS
CREATE TABLE IF NOT EXISTS public.integration_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mode integration_mode NOT NULL DEFAULT 'PROTOTYPE_DEMO',
    api_base_url TEXT NOT NULL DEFAULT 'https://igot-karmayogi.gov.in/api/v1',
    client_id TEXT NOT NULL DEFAULT 'STATSKILL_IGOT_DEMO_CLIENT',
    client_secret TEXT NOT NULL DEFAULT '••••••••••••••••',
    auth_mechanism auth_mechanism NOT NULL DEFAULT 'OAuth 2.0',
    auto_sync_interval_minutes INT NOT NULL DEFAULT 60,
    sync_on_gap_detection BOOLEAN NOT NULL DEFAULT TRUE,
    enable_deep_linking BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CHAT MESSAGES (KarmAI Assistant)
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('USER', 'KARM_AI')),
    text TEXT NOT NULL,
    suggested_actions JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. INDEXES FOR HIGH PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_user_competencies_user ON public.user_competencies(user_id);
CREATE INDEX IF NOT EXISTS idx_user_competencies_comp ON public.user_competencies(competency_id);
CREATE INDEX IF NOT EXISTS idx_evidence_user ON public.evidence(user_id);
CREATE INDEX IF NOT EXISTS idx_evidence_comp ON public.evidence(competency_id);
CREATE INDEX IF NOT EXISTS idx_igot_courses_competency ON public.igot_courses(competency);
CREATE INDEX IF NOT EXISTS idx_learning_paths_user ON public.user_learning_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_mcq_questions_doc ON public.mcq_questions(document_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user ON public.quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user ON public.chat_messages(user_id);

-- ============================================================================
-- 4. AUTOMATIC TRIGGERS & FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_settings_updated_at ON public.integration_settings;
CREATE TRIGGER trigger_settings_updated_at
    BEFORE UPDATE ON public.integration_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        name,
        employee_id,
        department,
        designation,
        role
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email, 'Statistical Officer'),
        COALESCE(NEW.raw_user_meta_data->>'employee_id', 'MoSPI-' || SUBSTRING(NEW.id::text FROM 1 FOR 6)),
        COALESCE(NEW.raw_user_meta_data->>'department', 'National Sample Survey Office (NSSO)'),
        COALESCE(NEW.raw_user_meta_data->>'designation', 'Statistical Officer'),
        'LEARNER'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.igot_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competency_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcq_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.department_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.future_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile or admins can view all"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role::text IN ('TRAINER', 'DEPARTMENT_ADMIN', 'SYSTEM_ADMIN', 'TRAINING_ADMIN')
    ));

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Anyone authenticated can view competencies"
    ON public.competencies FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Anyone authenticated can view iGOT courses"
    ON public.igot_courses FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage iGOT courses"
    ON public.igot_courses FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role::text IN ('TRAINER', 'DEPARTMENT_ADMIN', 'SYSTEM_ADMIN', 'TRAINING_ADMIN')
    ));

CREATE POLICY "Users can view and manage their own competencies"
    ON public.user_competencies FOR ALL
    USING (user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role::text IN ('TRAINER', 'DEPARTMENT_ADMIN', 'SYSTEM_ADMIN', 'TRAINING_ADMIN')
    ));

CREATE POLICY "Users can view their own evidence"
    ON public.evidence FOR SELECT
    USING (user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role::text IN ('TRAINER', 'DEPARTMENT_ADMIN', 'SYSTEM_ADMIN', 'TRAINING_ADMIN')
    ));

CREATE POLICY "Users can manage their own learning paths"
    ON public.user_learning_paths FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own quiz results"
    ON public.quiz_results FOR ALL
    USING (user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role::text IN ('TRAINER', 'DEPARTMENT_ADMIN', 'SYSTEM_ADMIN', 'TRAINING_ADMIN')
    ));

CREATE POLICY "Anyone authenticated can read department interventions"
    ON public.department_interventions FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Anyone authenticated can read future skills"
    ON public.future_skills FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can manage their chat messages"
    ON public.chat_messages FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Anyone authenticated can read integration settings"
    ON public.integration_settings FOR SELECT
    TO authenticated
    USING (true);

-- ============================================================================
-- 6. INITIAL SEED DATA
-- ============================================================================

INSERT INTO public.competencies (name, category, description) VALUES
    ('Survey Methodology', 'Statistical', 'Methods for probability sampling, questionnaire validation, CAPI collection protocols, and response error control.'),
    ('Python for Data Science', 'Technical', 'Exploratory data analysis, pandas microdata wrangling, and script automation for official statistics.'),
    ('SQL & Data Engineering', 'Technical', 'Relational database querying, multi-table JOINs, window functions, and NIC registry data linkage.'),
    ('Data Visualization & Dashboards', 'Digital', 'Building choropleth maps, district indicator dashboards, and executive data storytelling.'),
    ('AI & Machine Learning', 'Technical', 'Applying Random Forest, XGBoost, and NLP for survey non-response imputation and anomaly detection.'),
    ('Official Statistics & Communication', 'Managerial', 'Compliance with UN Fundamental Principles, data confidentiality, and statistical reporting.')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.igot_courses (course_id, title, competency, level, duration, language, match_score, source, description, learning_objectives, provider, deep_link_url, course_type, role_target, recommendation_reason, enrolled_count, rating) VALUES
    ('IGOT-DEMO-001', 'Advanced Survey Methodology', 'Survey Methodology', 'Intermediate', '4 hours', 'English', 96.00, 'Prototype iGOT Resource Mapping', 'Comprehensive guide to sampling frames, questionnaire design, field collection protocols, and response error minimization in national statistical operations.', ARRAY['Master probability sampling designs for national socio-economic surveys', 'Design error-resilient field collection forms with digital validation rules', 'Calculate design effects and weights for complex survey data'], 'National Statistical Systems Training Academy (NSSTA)', 'https://igotkarmayogi.gov.in/course/igot-demo-001', 'Self-Paced', ARRAY['Statistical Officer', 'Senior Field Investigator'], 'Recommended because your Survey Methodology competency is currently 43%, while your role requires a target level of 80%.', 1420, 4.90),
    ('IGOT-DEMO-004', 'Statistical Computing with Python for Public Policy', 'Python for Data Science', 'Intermediate', '8 hours', 'English', 94.00, 'Prototype iGOT Resource Mapping', 'Hands-on data manipulation, automated reporting, regression modelling, and pandas/numpy workflow tailored for government statistical divisions.', ARRAY['Wrangle large microdata sets using pandas and numpy', 'Automate statistical tables generation', 'Perform parametric hypothesis tests'], 'Digital India Academy / iGOT', 'https://igotkarmayogi.gov.in/course/igot-demo-004', 'Self-Paced', ARRAY['Statistical Officer', 'Data Analyst'], 'Critical for modernizing workflow efficiency from legacy spreadsheet processing to automated Python scripting.', 3150, 4.90),
    ('IGOT-DEMO-005', 'SQL & Relational Data Engineering for Analysts', 'SQL & Data Engineering', 'Intermediate', '5 hours', 'English', 89.00, 'Prototype iGOT Resource Mapping', 'Relational database querying, joins, aggregate window functions, indexing, and schema design for government statistical registries.', ARRAY['Write complex multi-table SQL JOIN queries for census microdata', 'Optimize query speed using indexes', 'Construct database views for real-time reporting dashboards'], 'National Informatics Centre (NIC) & iGOT', 'https://igotkarmayogi.gov.in/course/igot-demo-005', 'Self-Paced', ARRAY['Statistical Officer', 'Database Administrator'], 'Recommended because SQL is required for your current role and your current competency is 40%.', 2890, 4.80)
ON CONFLICT (course_id) DO NOTHING;

INSERT INTO public.future_skills (skill_name, category, current_readiness, target_readiness, reason, target_roles) VALUES
    ('Automated Survey Imputation via Machine Learning', 'AI & Modern Analytics', 25.00, 75.00, 'MoSPI modern data architecture strategy requires replacing manual rule-based unit non-response imputation with Random Forest & XGBoost pipelines by Q4 2026.', ARRAY['Statistical Officer', 'Data Analyst']),
    ('High-Frequency Satellite Nightlight Analytics', 'Geospatial & Big Data', 30.00, 70.00, 'Required for supplementary district-level GDP proxy calculations between decennial economic census rounds.', ARRAY['GIS Specialist', 'Economic Analyst']),
    ('Differential Privacy & Confidential Compute for Microdata', 'Data Security & Governance', 45.00, 80.00, 'Compliance with Digital Personal Data Protection (DPDP) Act for public release of socio-economic survey microdata.', ARRAY['Data Custodian', 'Statistical Officer'])
ON CONFLICT (skill_name) DO NOTHING;

INSERT INTO public.department_interventions (department, top_skill_gaps, affected_learner_count, suggested_training, priority, ai_summary) VALUES
    ('National Sample Survey Office (NSSO)', ARRAY['AI & Machine Learning (40% Deficit)', 'Survey Methodology (37% Deficit)'], 420, 'NSSTA CAPI & Imputation Protocol Workshop', 'Critical', 'The Survey Division shows a critical cluster gap in CAPI digital field validation and ML-assisted survey non-response imputation. Implementing an institutional workshop at NSSTA will improve field data accuracy by an estimated 28 percentage points across 420 officers.'),
    ('Economic Statistics Division (ESD)', ARRAY['Statistical Forecasting (35% Deficit)', 'Price Indices (33% Deficit)'], 280, 'Laspeyres Base Revisions & Time Series Masterclass', 'High', 'Economic Statistics officers require targeted elevation in quarterly Consumer Price Index (CPI) basket weighting and seasonal ARIMA adjustments prior to the upcoming base year update.')
ON CONFLICT DO NOTHING;

INSERT INTO public.integration_settings (mode, api_base_url, client_id, auth_mechanism, auto_sync_interval_minutes, sync_on_gap_detection, enable_deep_linking) VALUES
    ('PROTOTYPE_DEMO', 'https://igot-karmayogi.gov.in/api/v1', 'STATSKILL_IGOT_DEMO_CLIENT', 'OAuth 2.0', 60, true, true)
ON CONFLICT DO NOTHING;
