import type { Request, Response } from 'express';

interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export function getProfile(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  res.json({
    data: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      name: 'João Manuel',
      location: 'Luanda, Angola',
    },
  });
}

export function updateProfile(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  res.json({ data: { ...req.user, ...req.body } });
}

export function getAllUsers(_req: Request, res: Response) {
  res.json({
    data: [
      { id: '1', email: 'admin@portecosacademic.ao', role: 'admin', name: 'Admin PORTECOS' },
    ],
    total: 1,
  });
}
