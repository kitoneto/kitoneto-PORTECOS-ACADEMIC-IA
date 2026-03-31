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
