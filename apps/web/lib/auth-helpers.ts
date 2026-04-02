// Shared auth helpers for Next.js API route handlers
// Mirrors services/auth-service/src/auth.ts but adapted for App Router

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}

// In-memory user store — DEVELOPMENT ONLY.
// ⚠️ Replace with Supabase persistence before production deployment.
// ⚠️ Remove or disable the hardcoded admin user before going live.
export const users: StoredUser[] = [
  {
    id: '1',
    email: 'admin@portecosacademic.ao',
    passwordHash: bcrypt.hashSync('Admin@2026!', 10),
    name: 'Admin PORTECOS',
    role: 'admin',
  },
];

export function generateTokens(userId: string, email: string, role: string) {
  const secret = process.env.JWT_SECRET ?? 'default-secret';
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET ?? 'default-refresh-secret';

  const accessToken = jwt.sign({ id: userId, email, role }, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as jwt.SignOptions['expiresIn'],
  });
  const refreshToken = jwt.sign({ id: userId }, refreshSecret, {
    expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN ?? '30d') as jwt.SignOptions['expiresIn'],
  });

  return { accessToken, refreshToken };
}

export function verifyRefreshToken(token: string): { id: string } {
  const secret = process.env.REFRESH_TOKEN_SECRET ?? 'default-refresh-secret';
  return jwt.verify(token, secret) as { id: string };
}
