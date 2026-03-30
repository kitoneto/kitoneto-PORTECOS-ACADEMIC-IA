// PORTECOS ACADEMIC IA — Constants

export const BRAND = {
  name: 'PORTECOS ACADEMIC IA',
  tagline: 'Formação técnica com IA para Angola',
  colors: {
    dark:  '#1a365d',  // brand-dark (navy blue)
    gold:  '#d69e2e',  // brand-gold (golden)
    light: '#ebf8ff',  // brand-light (light blue)
    white: '#ffffff',
  },
  contact: {
    email:   'info@portecosacademic.ao',
    support: 'apoio@portecosacademic.ao',
    phone:   '+244 923 000 000',
    address: 'Luanda, Angola',
  },
} as const;

export const ROUTES = {
  home:     '/',
  courses:  '/cursos',
  lesson:   '/licao',
  profile:  '/perfil',
  login:    '/entrar',
  register: '/registar',
} as const;

export const API_ENDPOINTS = {
  courses:      '/api/courses',
  lessons:      '/api/lessons',
  users:        '/api/users',
  progress:     '/api/progress',
  auth: {
    login:    '/api/auth/login',
    register: '/api/auth/register',
    refresh:  '/api/auth/refresh',
  },
  ai: {
    tutor:    '/api/ai/tutor',
    evaluate: '/api/ai/evaluate',
    recommend:'/api/ai/recommend',
  },
} as const;

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Gratuito',
    priceAOA: 0,
    features: ['Até 5 cursos', 'Tutor IA limitado (10 mensagens/mês)', 'Comunidade'],
  },
  pro: {
    name: 'Pro',
    priceAOA: 5_000,
    features: ['Cursos ilimitados', 'Tutor IA ilimitado', 'Certificados', 'Download offline'],
  },
  enterprise: {
    name: 'Enterprise',
    priceAOA: 25_000,
    features: ['Tudo do Pro', 'API access', 'Suporte dedicado', 'Formações ao vivo'],
  },
} as const;

export const LEVEL_LABELS = {
  beginner:     'Iniciante',
  intermediate: 'Intermédio',
  advanced:     'Avançado',
} as const;
