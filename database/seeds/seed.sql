-- =============================================
-- PORTECOS ACADEMIC IA — Seed Data
-- =============================================

-- Areas
INSERT INTO areas (slug, name, icon, description) VALUES
('engenharia-civil',       'Engenharia Civil',         '🏗️', 'Fundações, estruturas, betão e topografia'),
('petroleo-gas',           'Petróleo & Gás',           '🛢️', 'Perfuração, produção e refino'),
('ambiente',               'Ambiente',                 '🌿', 'Avaliação de impacto e gestão ambiental'),
('obras-fiscalizacao',     'Obras & Fiscalização',     '🔨', 'Fiscalização, normas e qualidade'),
('mecanica',               'Mecânica',                 '⚙️', 'Termodinâmica, máquinas e manutenção'),
('energias-renovaveis',    'Energias Renováveis',      '☀️', 'Solar, eólica e hídrica'),
('eletricidade-eletronica','Eletricidade & Eletrónica','⚡', 'Circuitos, instalações e automação'),
('telecomunicacoes',       'Telecomunicações',         '📡', 'Redes, fibra óptica e 5G'),
('inteligencia-artificial','Inteligência Artificial',  '��', 'ML, Deep Learning e NLP')
ON CONFLICT (slug) DO NOTHING;

-- Admin user (password: Admin@2026!)
INSERT INTO users (email, password_hash, name, role, location, subscription_tier) VALUES
('admin@portecosacademic.ao',
 crypt('Admin@2026!', gen_salt('bf', 12)),
 'Admin PORTECOS', 'admin', 'Luanda, Angola', 'enterprise')
ON CONFLICT (email) DO NOTHING;

-- Sample instructor
INSERT INTO users (email, password_hash, name, role, location, profession, subscription_tier) VALUES
('eng.carlos@portecosacademic.ao',
 crypt('Instructor@2026!', gen_salt('bf', 12)),
 'Eng. Carlos Ferreira', 'instructor', 'Luanda, Angola', 'Engenheiro Civil Sénior', 'pro')
ON CONFLICT (email) DO NOTHING;

-- Sample courses
INSERT INTO courses (title, slug, area_id, instructor_id, level, description, is_published, price_aoa)
SELECT
    'Fundações em Solo Laterítico',
    'fundacoes-solo-lateritico',
    a.id,
    u.id,
    'intermediate',
    'Aprenda a projetar fundações seguras no solo laterítico característico de Luanda. Inclui problemas reais de obras angolanas.',
    TRUE,
    0
FROM areas a, users u
WHERE a.slug = 'engenharia-civil' AND u.email = 'eng.carlos@portecosacademic.ao'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO courses (title, slug, area_id, instructor_id, level, description, is_published, price_aoa)
SELECT
    'Instalação Solar no Namibe',
    'instalacao-solar-namibe',
    a.id,
    u.id,
    'beginner',
    'Dimensionamento e instalação de sistemas fotovoltaicos no Namibe, aproveitando a alta irradiação solar da região.',
    TRUE,
    0
FROM areas a, users u
WHERE a.slug = 'energias-renovaveis' AND u.email = 'eng.carlos@portecosacademic.ao'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO courses (title, slug, area_id, instructor_id, level, description, is_published, price_aoa)
SELECT
    'Perfuração Offshore — Cabinda',
    'perfuracao-offshore-cabinda',
    a.id,
    u.id,
    'advanced',
    'Técnicas de perfuração em blocos offshore da Bacia do Congo. Foco nos Blocos 0, 14 e 17.',
    TRUE,
    5000
FROM areas a, users u
WHERE a.slug = 'petroleo-gas' AND u.email = 'eng.carlos@portecosacademic.ao'
ON CONFLICT (slug) DO NOTHING;

-- Sample lessons for first course
INSERT INTO lessons (course_id, title, "order", type, content, question, options, correct_answer, explanation, xp_reward)
SELECT
    c.id,
    'O que é Solo Laterítico?',
    1,
    'concept',
    'O solo laterítico é um tipo de solo tropical muito comum em Angola, especialmente em Luanda. É formado pela decomposição de rochas em climas quentes e húmidos, resultando num solo rico em óxidos de ferro e alumínio.',
    'Qual é a principal preocupação ao construir fundações em solo laterítico?',
    '["A cor vermelha do solo", "A variação de volume com humidade e baixa capacidade de carga", "A presença de água subterrânea", "A profundidade do bedrock"]',
    1,
    'O solo laterítico pode expandir ou contrair significativamente com mudanças de humidade, o que pode causar recalques diferenciais nas fundações.',
    15
FROM courses c
WHERE c.slug = 'fundacoes-solo-lateritico'
ON CONFLICT DO NOTHING;

INSERT INTO lessons (course_id, title, "order", type, content, question, options, correct_answer, explanation, xp_reward)
SELECT
    c.id,
    'Cálculo de Sapatas em Luanda',
    2,
    'problem',
    'Um cliente em Luanda quer construir um edifício de 4 andares. Tensão admissível do solo: 120 kPa. Carga por pilar: 600 kN.',
    'Qual a área mínima de uma sapata isolada para este pilar?',
    '["2 m² (1.4m × 1.4m)", "3 m² (1.73m × 1.73m)", "5 m² (2.24m × 2.24m)", "6 m² (2.45m × 2.45m)"]',
    2,
    'Área = Carga / Tensão admissível = 600 kN / 120 kPa = 5 m². Logo, a sapata deve ter pelo menos 2.24m × 2.24m.',
    25
FROM courses c
WHERE c.slug = 'fundacoes-solo-lateritico'
ON CONFLICT DO NOTHING;

\echo 'Seed data inserted successfully.'
