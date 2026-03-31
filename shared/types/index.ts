// PORTECOS ACADEMIC IA — Shared TypeScript Interfaces

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  location?: string;
  profession?: string;
  avatarUrl?: string;
  points: number;
  streak: number;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface Area {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  area: Area;
  instructorId: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  thumbnailUrl?: string;
  lessonCount: number;
  isPublished: boolean;
  priceAoa: number;
  createdAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  type: 'concept' | 'problem' | 'quiz' | 'video';
  content: string;
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  xpReward: number;
}

export interface Progress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  attempts: number;
  completedAt?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  certificateId: string;
  pdfUrl?: string;
  issuedAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  amountAoa: number;
  currency: 'AOA' | 'USD' | 'EUR';
  paymentMethod: 'multicaixa' | 'unitel_money' | 'movicel' | 'stripe' | 'free';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
}

export interface AITutorMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface APIResponse<T> {
  data: T;
  total?: number;
  error?: string;
}

export const AREAS: Area[] = [
  { id: '1', slug: 'engenharia-civil',        name: 'Engenharia Civil',         icon: '🏗️' },
  { id: '2', slug: 'petroleo-gas',             name: 'Petróleo & Gás',           icon: '🛢️' },
  { id: '3', slug: 'ambiente',                 name: 'Ambiente',                 icon: '🌿' },
  { id: '4', slug: 'obras-fiscalizacao',       name: 'Obras & Fiscalização',     icon: '🔨' },
  { id: '5', slug: 'mecanica',                 name: 'Mecânica',                 icon: '⚙️' },
  { id: '6', slug: 'energias-renovaveis',      name: 'Energias Renováveis',      icon: '☀️' },
  { id: '7', slug: 'eletricidade-eletronica',  name: 'Eletricidade & Eletrónica',icon: '⚡' },
  { id: '8', slug: 'telecomunicacoes',         name: 'Telecomunicações',         icon: '📡' },
  { id: '9', slug: 'inteligencia-artificial',  name: 'Inteligência Artificial',  icon: '🤖' },
];

// =============================================
// WGU / CBE MODEL — New interfaces
// =============================================

export interface Program {
  id: string;
  slug: string;
  name: string;
  level: 'bachelor' | 'master' | 'certificate';
  areaId: string;
  description: string;
  durationTerms: number;
  competencyCount: number;
  pricePerTermAoa: number;
  isPublished: boolean;
}

export interface Competency {
  id: string;
  programId: string;
  title: string;
  description: string;
  order: number;
  assessmentType: 'quiz' | 'project' | 'exam';
  passingScore: number;
  status?: 'not_started' | 'in_progress' | 'competent' | 'not_yet_competent';
}

export interface Term {
  id: string;
  userId: string;
  programId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface ProgramEnrollment {
  id: string;
  userId: string;
  programId: string;
  termId: string;
  status: 'active' | 'on_hold' | 'graduated' | 'withdrawn';
  enrolledAt: string;
}

export interface Assessment {
  id: string;
  competencyId: string;
  title: string;
  type: 'quiz' | 'project' | 'exam';
  content: Record<string, unknown>;
  maxAttempts: number;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  assessmentId: string;
  status: 'competent' | 'not_yet_competent';
  attemptNumber: number;
  submittedAt: string;
  feedback?: string;
}

export interface MentorSession {
  id: string;
  userId: string;
  messages: AITutorMessage[];
  sessionType: 'motivation' | 'planning' | 'progress';
  createdAt: string;
  updatedAt: string;
}

export interface StudyPlan {
  id: string;
  userId: string;
  termId: string;
  weeklyGoals: WeeklyGoal[];
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyGoal {
  week: number;
  competencies: string[];
  targetCompletionDate: string;
  completed: boolean;
}

export interface Admission {
  id: string;
  userId: string;
  programId: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  documents: AdmissionDocument[];
  submittedAt: string;
  updatedAt: string;
}

export interface AdmissionDocument {
  type: 'bi' | 'diploma' | 'transcript' | 'photo' | 'other';
  name: string;
  url?: string;
  uploadedAt: string;
}

export const PROGRAMS: Program[] = [
  { id: '1',  slug: 'bs-engenharia-civil',       name: 'B.S. Engenharia Civil',                     level: 'bachelor',     areaId: '1', description: 'Projecte e construa infraestruturas para o desenvolvimento de Angola.',        durationTerms: 8, competencyCount: 40, pricePerTermAoa: 45000, isPublished: true },
  { id: '2',  slug: 'bs-petroleo-gas',            name: 'B.S. Engenharia de Petróleo & Gás',         level: 'bachelor',     areaId: '2', description: 'Domine as técnicas de exploração e produção petrolífera.',                    durationTerms: 8, competencyCount: 42, pricePerTermAoa: 55000, isPublished: true },
  { id: '3',  slug: 'bs-engenharia-ambiental',    name: 'B.S. Engenharia Ambiental',                 level: 'bachelor',     areaId: '3', description: 'Proteja e gira os recursos naturais de Angola.',                             durationTerms: 8, competencyCount: 38, pricePerTermAoa: 42000, isPublished: true },
  { id: '4',  slug: 'bs-engenharia-mecanica',     name: 'B.S. Engenharia Mecânica',                  level: 'bachelor',     areaId: '5', description: 'Projecte sistemas mecânicos para a indústria angolana.',                     durationTerms: 8, competencyCount: 40, pricePerTermAoa: 45000, isPublished: true },
  { id: '5',  slug: 'bs-energias-renovaveis',     name: 'B.S. Engenharia de Energias Renováveis',    level: 'bachelor',     areaId: '6', description: 'Lidere a transição energética de Angola.',                                  durationTerms: 8, competencyCount: 36, pricePerTermAoa: 48000, isPublished: true },
  { id: '6',  slug: 'bs-electrotecnica',          name: 'B.S. Engenharia Electrotécnica',            level: 'bachelor',     areaId: '7', description: 'Projecte sistemas elétricos e eletrónicos.',                                durationTerms: 8, competencyCount: 40, pricePerTermAoa: 45000, isPublished: true },
  { id: '7',  slug: 'bs-telecomunicacoes',        name: 'B.S. Engenharia de Telecomunicações',       level: 'bachelor',     areaId: '8', description: 'Construa a infraestrutura digital de Angola.',                              durationTerms: 8, competencyCount: 38, pricePerTermAoa: 48000, isPublished: true },
  { id: '8',  slug: 'bs-ia-data-science',         name: 'B.S. Inteligência Artificial & Data Science', level: 'bachelor',   areaId: '9', description: 'Aplique IA para resolver problemas reais angolanos.',                       durationTerms: 8, competencyCount: 42, pricePerTermAoa: 55000, isPublished: true },
  { id: '9',  slug: 'ms-gestao-obras',            name: 'M.S. Gestão de Obras & Fiscalização',       level: 'master',       areaId: '4', description: 'Gira e fiscalize obras de grande envergadura.',                             durationTerms: 4, competencyCount: 20, pricePerTermAoa: 75000, isPublished: true },
  { id: '10', slug: 'ms-petroleo-avancado',       name: 'M.S. Engenharia de Petróleo (Avançado)',    level: 'master',       areaId: '2', description: 'Especialização avançada em engenharia petrolífera.',                        durationTerms: 4, competencyCount: 22, pricePerTermAoa: 85000, isPublished: true },
  { id: '11', slug: 'ms-ia-aplicada',             name: 'M.S. Inteligência Artificial Aplicada',     level: 'master',       areaId: '9', description: 'Mestrado em IA com aplicações à engenharia.',                               durationTerms: 4, competencyCount: 20, pricePerTermAoa: 80000, isPublished: true },
  { id: '12', slug: 'cert-fiscalizacao',          name: 'Certificado em Fiscalização de Obras',      level: 'certificate',  areaId: '4', description: 'Certificação profissional em fiscalização de obras.',                       durationTerms: 1, competencyCount: 8,  pricePerTermAoa: 35000, isPublished: true },
  { id: '13', slug: 'cert-energias-renovaveis',   name: 'Certificado em Energias Renováveis',        level: 'certificate',  areaId: '6', description: 'Certificação em instalação e manutenção de sistemas renováveis.',            durationTerms: 1, competencyCount: 6,  pricePerTermAoa: 30000, isPublished: true },
  { id: '14', slug: 'cert-ia-engenharia',         name: 'Certificado em IA para Engenharia',         level: 'certificate',  areaId: '9', description: 'Fundamentos de IA aplicados à engenharia técnica.',                         durationTerms: 1, competencyCount: 6,  pricePerTermAoa: 35000, isPublished: true },
];
