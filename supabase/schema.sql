-- ============================================================================
-- StatSkill AI + iGOT Karmayogi Integration - Supabase Database Schema
-- Project: SIH 2026 Demo / Ministry of Statistics and Programme Implementation (MoSPI)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ENUMS & CONSTANTS
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('LEARNER', 'TRAINING_ADMIN', 'SYSTEM_ADMIN');
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

-- ============================================================================
-- 2. TABLES
-- ============================================================================

-- PROFILES (Links with Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    employee_id TEXT UNIQUE NOT NULL,
    department TEXT NOT NULL DEFAULT 'National Sample Survey Office (NSSO)',
    designation TEXT NOT NULL DEFAULT 'Statistical Officer',
    organization TEXT NOT NULL DEFAULT 'MoSPI',
    years_of_experience INT NOT NULL DEFAULT 5,
    role user_role NOT NULL DEFAULT 'LEARNER',
    avatar_url TEXT,
    learning_goal TEXT DEFAULT 'Master Big Data Analytics and National Accounts estimation techniques for official statistics.',
    existing_skills TEXT[] DEFAULT ARRAY['Survey Sampling', 'Excel', 'Basic R', 'Data Processing'],
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

-- USER COMPETENCIES (Skill Assessments)
CREATE TABLE IF NOT EXISTS public.user_competencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    competency_id UUID NOT NULL REFERENCES public.competencies(id) ON DELETE CASCADE,
    current_level NUMERIC(5, 2) NOT NULL DEFAULT 50.00 CHECK (current_level >= 0 AND current_level <= 100),
    target_level NUMERIC(5, 2) NOT NULL DEFAULT 85.00 CHECK (target_level >= 0 AND target_level <= 100),
    status competency_status NOT NULL DEFAULT 'MODERATE',
    last_assessed TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT user_competency_unique UNIQUE (user_id, competency_id)
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
    source TEXT NOT NULL DEFAULT 'iGOT Karmayogi',
    description TEXT,
    learning_objectives TEXT[] DEFAULT ARRAY[]::TEXT[],
    provider TEXT NOT NULL DEFAULT 'National Statistical Systems Training Academy (NSSTA)',
    deep_link_url TEXT,
    course_type course_type NOT NULL DEFAULT 'Self-Paced',
    role_target TEXT[] DEFAULT ARRAY['Statistical Officer', 'Director', 'Data Analyst'],
    recommendation_reason TEXT,
    enrolled_count INT NOT NULL DEFAULT 120,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 4.70,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- COMPETENCY MAPPING RECORDS (StatSkill <-> iGOT Taxonomy)
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

-- DOCUMENT UPLOADS (RAG Curriculum Documents)
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

-- MCQ QUESTIONS (AI Generated & Evaluated)
CREATE TABLE IF NOT EXISTS public.mcq_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES public.document_uploads(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- e.g., ["Option A", "Option B", "Option C", "Option D"]
    correct_index INT NOT NULL CHECK (correct_index >= 0),
    explanation TEXT,
    source_document TEXT,
    source_page INT DEFAULT 1,
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

-- KARM-AI CHAT MESSAGES
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('USER', 'KARM_AI')),
    text TEXT NOT NULL,
    suggested_actions JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_user_competencies_user ON public.user_competencies(user_id);
CREATE INDEX IF NOT EXISTS idx_user_competencies_comp ON public.user_competencies(competency_id);
CREATE INDEX IF NOT EXISTS idx_igot_courses_competency ON public.igot_courses(competency);
CREATE INDEX IF NOT EXISTS idx_learning_paths_user ON public.user_learning_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_mcq_questions_doc ON public.mcq_questions(document_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user ON public.quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user ON public.chat_messages(user_id);

-- ============================================================================
-- 4. AUTOMATIC TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function to handle timestamp update
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles
DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for integration settings
DROP TRIGGER IF EXISTS trigger_settings_updated_at ON public.integration_settings;
CREATE TRIGGER trigger_settings_updated_at
    BEFORE UPDATE ON public.integration_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Automatic Profile Creation on Supabase Auth Signup
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
        COALESCE(NEW.raw_user_meta_data->>'employee_id', 'EMP-' || SUBSTRING(NEW.id::text FROM 1 FOR 8)),
        COALESCE(NEW.raw_user_meta_data->>'department', 'National Sample Survey Office (NSSO)'),
        COALESCE(NEW.raw_user_meta_data->>'designation', 'Senior Statistical Officer'),
        'LEARNER'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.igot_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competency_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcq_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile or admins can view all"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TRAINING_ADMIN', 'SYSTEM_ADMIN')
    ));

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- iGOT Courses Policies (Public/Authenticated read, admin write)
CREATE POLICY "Anyone authenticated can view iGOT courses"
    ON public.igot_courses FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage iGOT courses"
    ON public.igot_courses FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TRAINING_ADMIN', 'SYSTEM_ADMIN')
    ));

-- User Competencies Policies
CREATE POLICY "Users can view and manage their own competencies"
    ON public.user_competencies FOR ALL
    USING (user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TRAINING_ADMIN', 'SYSTEM_ADMIN')
    ));

-- Learning Paths Policies
CREATE POLICY "Users can manage their own learning paths"
    ON public.user_learning_paths FOR ALL
    USING (user_id = auth.uid());

-- Quiz Results Policies
CREATE POLICY "Users can manage their own quiz results"
    ON public.quiz_results FOR ALL
    USING (user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TRAINING_ADMIN', 'SYSTEM_ADMIN')
    ));

-- Chat Messages Policies
CREATE POLICY "Users can manage their chat messages"
    ON public.chat_messages FOR ALL
    USING (user_id = auth.uid());

-- Integration Settings Policies
CREATE POLICY "Anyone authenticated can read integration settings"
    ON public.integration_settings FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can update integration settings"
    ON public.integration_settings FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TRAINING_ADMIN', 'SYSTEM_ADMIN')
    ));

-- ============================================================================
-- 6. INITIAL SEED DATA
-- ============================================================================

-- Insert Core Competencies Catalog
INSERT INTO public.competencies (name, category, description) VALUES
    ('National Accounts & GDP Computation', 'Statistical', 'Methods for calculating GDP, GVA, and macroeconomic aggregates per System of National Accounts (SNA 2008).'),
    ('Advanced Sample Survey Design & Estimation', 'Statistical', 'Stratified sampling, cluster sampling, weighting, and variance estimation techniques.'),
    ('Data Visualization & Analytics in R/Python', 'Technical', 'Exploratory data analysis, interactive dashboard creation, and automated reporting.'),
    ('AI & Machine Learning in Official Statistics', 'Technical', 'Applying ML for anomaly detection, data imputation, and predictive modeling in census/surveys.'),
    ('Time Series & Macroeconometric Forecasting', 'Statistical', 'ARIMA, VAR, state-space modeling, and seasonal adjustments for economic indicators.'),
    ('Data Governance & Survey Privacy Standards', 'Digital', 'Compliance with PDPB, data anonymization, confidential compute, and safe data handling.')
ON CONFLICT (name) DO NOTHING;

-- Insert iGOT Courses Seed
INSERT INTO public.igot_courses (course_id, title, competency, level, duration, language, match_score, source, description, learning_objectives, provider, deep_link_url, course_type, role_target, recommendation_reason, enrolled_count, rating) VALUES
    ('IGOT-STAT-101', 'National Accounts Framework & SNA 2008', 'National Accounts & GDP Computation', 'Intermediate', '6 hours', 'English & Hindi', 96.00, 'iGOT Karmayogi', 'Comprehensive guide to national account compilation, gross value added (GVA) calculation, and sectoral deflators.', ARRAY['Understand SNA 2008 principles', 'Calculate quarterly GVA estimates', 'Apply CPI/WPI deflators'], 'National Statistical Systems Training Academy (NSSTA)', 'https://igotkarmayogi.gov.in/learn/course/IGOT-STAT-101', 'Self-Paced', ARRAY['Statistical Officer', 'Director'], 'Directly addresses identified gap in National Accounts compilation', 342, 4.85),
    ('IGOT-STAT-204', 'Sample Survey Design & Variance Estimation', 'Advanced Sample Survey Design & Estimation', 'Advanced', '8 hours', 'English', 94.00, 'iGOT Karmayogi', 'Master complex sample designs, non-response adjustments, and bootstrap/jackknife variance estimation methods.', ARRAY['Design multi-stage stratified surveys', 'Calculate sampling weights & design effects', 'Conduct non-sampling error audits'], 'NSSTA & ISI Kolkata', 'https://igotkarmayogi.gov.in/learn/course/IGOT-STAT-204', 'Interactive Workshop', ARRAY['Senior Statistical Officer', 'Deputy Director'], 'High relevance to upcoming Periodic Labour Force Survey (PLFS)', 512, 4.90),
    ('IGOT-TECH-302', 'Python for Official Data Analytics', 'Data Visualization & Analytics in R/Python', 'Basic', '4 hours', 'English', 89.00, 'iGOT Integration Demo', 'Hands-on training on pandas, numpy, and plotnine for statistical workflow automation.', ARRAY['Wrangle microdata files', 'Automate data validation pipelines', 'Build summary tables'], 'NSSTA Digital Cell', 'https://igotkarmayogi.gov.in/learn/course/IGOT-TECH-302', 'Micro-Credential', ARRAY['Junior Statistical Officer', 'Statistical Inspector'], 'Closes technical skill gap in modern data processing tools', 789, 4.75),
    ('IGOT-AI-401', 'AI/ML Applications in Survey Imputation', 'AI & Machine Learning in Official Statistics', 'Advanced', '10 hours', 'English', 92.00, 'NSSTA Institutional', 'Leverage Random Forest and XGBoost for missing data imputation in large-scale socio-economic surveys.', ARRAY['Implement KNN and ML imputation models', 'Detect outliers in survey microdata', 'Validate imputed datasets'], 'IIT Kharagpur & MoSPI AI Division', 'https://igotkarmayogi.gov.in/learn/course/IGOT-AI-401', 'Blended Training', ARRAY['Data Analyst', 'Joint Director'], 'Priority gap identified by KARM-AI engine for high-impact innovation', 215, 4.80)
ON CONFLICT (course_id) DO NOTHING;

-- Insert Competency Mapping Seed
INSERT INTO public.competency_mappings (stat_skill_competency, igot_competency, match_percentage, domain, status) VALUES
    ('GDP & National Income Accounting', 'National Accounts & SNA 2008 Standards', 98.00, 'Macroeconomic Statistics', 'Mapped'),
    ('Large-Scale Survey Sampling', 'Sample Design & Estimation Techniques', 95.00, 'Survey Operations', 'Mapped'),
    ('Automated Data Cleansing & EDA', 'Python & R Data Analytics for Public Sector', 91.00, 'Data Science', 'Auto-Aligned'),
    ('Machine Learning Imputation', 'AI/ML in Official Statistics & Survey Analytics', 93.00, 'Advanced Analytics', 'Pending Review')
ON CONFLICT DO NOTHING;

-- Insert Integration Settings Seed
INSERT INTO public.integration_settings (mode, api_base_url, client_id, auth_mechanism, auto_sync_interval_minutes, sync_on_gap_detection, enable_deep_linking) VALUES
    ('PROTOTYPE_DEMO', 'https://igot-karmayogi.gov.in/api/v1', 'STATSKILL_IGOT_DEMO_CLIENT', 'OAuth 2.0', 60, true, true)
ON CONFLICT DO NOTHING;
