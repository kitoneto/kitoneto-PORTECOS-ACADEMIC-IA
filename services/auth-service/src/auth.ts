import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// In-memory user store (replace with PostgreSQL in production)
const users: Array<{ id: string; email: string; passwordHash: string; name: string; role: string }> = [
  {
    id: '1',
    email: 'admin@portecosacademic.ao',
    passwordHash: bcrypt.hashSync('Admin@2026!', 10),
    name: 'Admin PORTECOS',
    role: 'admin',
  },
];

function generateTokens(userId: string, email: string, role: string) {
  const secret = process.env.JWT_SECRET ?? 'default-secret';
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET ?? 'default-refresh-secret';

  const accessToken = jwt.sign({ id: userId, email, role }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  });
  const refresh = jwt.sign({ id: userId }, refreshSecret, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '30d',
  });

  return { accessToken, refreshToken: refresh };
}

export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Dados inválidos', details: result.error.errors });
  }

  const { email, password, name } = result.data;

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: 'Email já registado' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const newUser = { id: String(users.length + 1), email, passwordHash, name, role: 'student' };
  users.push(newUser);

  const tokens = generateTokens(newUser.id, email, 'student');
  res.status(201).json({ data: { user: { id: newUser.id, email, name, role: 'student' }, ...tokens } });
}

export async function login(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  const { email, password } = result.data;
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const tokens = generateTokens(user.id, email, user.role);
  res.json({ data: { user: { id: user.id, email, name: user.name, role: user.role }, ...tokens } });
}

export function refreshToken(req: Request, res: Response) {
  const { refreshToken: token } = req.body as { refreshToken?: string };
  if (!token) return res.status(400).json({ error: 'Refresh token necessário' });

  try {
    const secret = process.env.REFRESH_TOKEN_SECRET ?? 'default-refresh-secret';
    const payload = jwt.verify(token, secret) as { id: string };
    const user = users.find((u) => u.id === payload.id);
    if (!user) return res.status(401).json({ error: 'Utilizador não encontrado' });

    const tokens = generateTokens(user.id, user.email, user.role);
    res.json({ data: tokens });
  } catch {
    res.status(401).json({ error: 'Refresh token inválido' });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body as { email?: string };
  if (!email) return res.status(400).json({ error: 'Email necessário' });

  // In production: send email with reset link
  res.json({ message: 'Se o email existir, receberá um link de recuperação.' });
}
