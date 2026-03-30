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
