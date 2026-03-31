-- =============================================
-- PORTECOS ACADEMIC IA — PostgreSQL Schema
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==================
-- USERS
-- ==================
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    name            VARCHAR(255) NOT NULL,
    role            VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
    location        VARCHAR(255),
    profession      VARCHAR(255),
    avatar_url      TEXT,
    points          INTEGER NOT NULL DEFAULT 0,
    streak          INTEGER NOT NULL DEFAULT 0,
    last_active_at  TIMESTAMPTZ,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    subscription_tier VARCHAR(50) NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================
-- AREAS
-- ==================
CREATE TABLE areas (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug        VARCHAR(100) UNIQUE NOT NULL,
    name        VARCHAR(255) NOT NULL,
    icon        VARCHAR(10),
    description TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================
-- COURSES
-- ==================
CREATE TABLE courses (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title           VARCHAR(500) NOT NULL,
    slug            VARCHAR(500) UNIQUE NOT NULL,
    area_id         UUID REFERENCES areas(id) ON DELETE SET NULL,
    instructor_id   UUID REFERENCES users(id) ON DELETE SET NULL,
    level           VARCHAR(50) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    description     TEXT,
    thumbnail_url   TEXT,
    lesson_count    INTEGER NOT NULL DEFAULT 0,
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    price_aoa       INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================
-- LESSONS
-- ==================
CREATE TABLE lessons (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title           VARCHAR(500) NOT NULL,
    "order"         INTEGER NOT NULL,
    type            VARCHAR(50) NOT NULL CHECK (type IN ('concept', 'problem', 'quiz', 'video')),
    content         TEXT NOT NULL,
    question        TEXT,
    options         JSONB,
    correct_answer  INTEGER,
    explanation     TEXT,
    xp_reward       INTEGER NOT NULL DEFAULT 10,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(course_id, "order")
);

-- ==================
-- ENROLLMENTS
-- ==================
CREATE TABLE enrollments (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- ==================
-- PROGRESS
-- ==================
CREATE TABLE progress (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id       UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    completed       BOOLEAN NOT NULL DEFAULT FALSE,
    score           INTEGER CHECK (score >= 0 AND score <= 100),
    attempts        INTEGER NOT NULL DEFAULT 0,
    completed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- ==================
-- CERTIFICATES
-- ==================
CREATE TABLE certificates (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    certificate_id  VARCHAR(100) UNIQUE NOT NULL,
    pdf_url         TEXT,
    issued_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- ==================
-- PAYMENTS
-- ==================
CREATE TABLE payments (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount_aoa          INTEGER NOT NULL,
    currency            VARCHAR(10) NOT NULL DEFAULT 'AOA',
    payment_method      VARCHAR(50) NOT NULL CHECK (payment_method IN ('multicaixa', 'unitel_money', 'movicel', 'stripe', 'free')),
    status              VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    external_reference  VARCHAR(255),
    subscription_tier   VARCHAR(50),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================
-- AI TUTOR SESSIONS
-- ==================
CREATE TABLE ai_sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id       UUID REFERENCES lessons(id) ON DELETE SET NULL,
    area            VARCHAR(100),
    messages        JSONB NOT NULL DEFAULT '[]',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================
-- INDEXES
-- ==================
CREATE INDEX idx_courses_area_id ON courses(area_id);
CREATE INDEX idx_courses_is_published ON courses(is_published);
CREATE INDEX idx_lessons_course_id ON lessons(course_id);
CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_progress_course_id ON progress(course_id);
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);

-- ==================
-- UPDATED_AT TRIGGER
-- ==================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_progress_updated_at BEFORE UPDATE ON progress FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =============================================
-- WGU / CBE MODEL — New Tables
-- =============================================

-- ==================
-- PROGRAMS
-- ==================
CREATE TABLE programs (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug                VARCHAR(200) UNIQUE NOT NULL,
    name                VARCHAR(500) NOT NULL,
    level               VARCHAR(20) NOT NULL CHECK (level IN ('bachelor', 'master', 'certificate')),
    area_id             UUID REFERENCES areas(id) ON DELETE SET NULL,
    description         TEXT,
    duration_terms      INTEGER NOT NULL DEFAULT 8,
    competency_count    INTEGER NOT NULL DEFAULT 0,
    price_per_term_aoa  INTEGER NOT NULL DEFAULT 45000,
    is_published        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================
-- COMPETENCIES
-- ==================
CREATE TABLE competencies (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id       UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    title            VARCHAR(500) NOT NULL,
    description      TEXT,
    "order"          INTEGER NOT NULL DEFAULT 1,
    assessment_type  VARCHAR(20) NOT NULL CHECK (assessment_type IN ('quiz', 'project', 'exam')),
    passing_score    INTEGER NOT NULL DEFAULT 70,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================
-- TERMS
-- ==================
CREATE TABLE terms (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    program_id   UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    start_date   DATE NOT NULL,
    end_date     DATE NOT NULL,
    status       VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================
-- PROGRAM ENROLLMENTS
-- ==================
CREATE TABLE program_enrollments (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    program_id   UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    term_id      UUID REFERENCES terms(id) ON DELETE SET NULL,
    status       VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'on_hold', 'graduated', 'withdrawn')),
    enrolled_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, program_id)
);

-- ==================
-- ASSESSMENTS
-- ==================
CREATE TABLE assessments (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competency_id    UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    title            VARCHAR(500) NOT NULL,
    type             VARCHAR(20) NOT NULL CHECK (type IN ('quiz', 'project', 'exam')),
    content_json     JSONB NOT NULL DEFAULT '{}',
    max_attempts     INTEGER NOT NULL DEFAULT 3,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================
-- ASSESSMENT RESULTS
-- ==================
CREATE TABLE assessment_results (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assessment_id    UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    status           VARCHAR(25) NOT NULL CHECK (status IN ('competent', 'not_yet_competent')),
    attempt_number   INTEGER NOT NULL DEFAULT 1,
    submitted_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    feedback         TEXT
);

-- ==================
-- MENTOR SESSIONS
-- ==================
CREATE TABLE mentor_sessions (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    messages_json    JSONB NOT NULL DEFAULT '[]',
    session_type     VARCHAR(20) NOT NULL DEFAULT 'general' CHECK (session_type IN ('motivation', 'planning', 'progress', 'general')),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================
-- STUDY PLANS
-- ==================
CREATE TABLE study_plans (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    term_id             UUID NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
    weekly_goals_json   JSONB NOT NULL DEFAULT '[]',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, term_id)
);

-- ==================
-- ADMISSIONS
-- ==================
CREATE TABLE admissions (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id          UUID REFERENCES users(id) ON DELETE SET NULL,
    program_id       UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    status           VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),
    documents_json   JSONB NOT NULL DEFAULT '[]',
    submitted_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- INDEXES — CBE tables
-- =============================================
CREATE INDEX idx_programs_level     ON programs (level);
CREATE INDEX idx_programs_area_id   ON programs (area_id);
CREATE INDEX idx_competencies_prog  ON competencies (program_id);
CREATE INDEX idx_terms_user         ON terms (user_id);
CREATE INDEX idx_terms_status       ON terms (status);
CREATE INDEX idx_enrollments_user   ON program_enrollments (user_id);
CREATE INDEX idx_enrollments_prog   ON program_enrollments (program_id);
CREATE INDEX idx_assessments_comp   ON assessments (competency_id);
CREATE INDEX idx_results_user       ON assessment_results (user_id);
CREATE INDEX idx_results_assessment ON assessment_results (assessment_id);
CREATE INDEX idx_mentor_user        ON mentor_sessions (user_id);
CREATE INDEX idx_study_plans_user   ON study_plans (user_id);
CREATE INDEX idx_admissions_user    ON admissions (user_id);
CREATE INDEX idx_admissions_status  ON admissions (status);

-- =============================================
-- TRIGGERS — updated_at for new tables
-- =============================================
CREATE TRIGGER trg_mentor_sessions_updated_at
    BEFORE UPDATE ON mentor_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_study_plans_updated_at
    BEFORE UPDATE ON study_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_admissions_updated_at
    BEFORE UPDATE ON admissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
