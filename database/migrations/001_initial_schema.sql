-- Migration 001: Initial Schema
-- PORTECOS ACADEMIC IA
-- Run: psql $DATABASE_URL < database/migrations/001_initial_schema.sql

\echo 'Running migration 001: Initial Schema...'

-- Load full schema
\i database/schemas/schema.sql

\echo 'Migration 001 complete.'
