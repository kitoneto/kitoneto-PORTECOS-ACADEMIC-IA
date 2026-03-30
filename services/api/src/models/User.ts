export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  location?: string;
  profession?: string;
  avatarUrl?: string;
  points: number;
  streak: number;
  lastActiveAt?: Date;
  isEmailVerified: boolean;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}
