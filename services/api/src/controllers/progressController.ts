import type { Request, Response } from 'express';

interface AuthRequest extends Request {
  user?: { id: string };
}

export function getUserProgress(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
  res.json({
    data: {
      userId: req.user.id,
      coursesCompleted: 3,
      coursesInProgress: 2,
      totalLessonsCompleted: 47,
      points: 2340,
      streak: 12,
    },
  });
}

export function updateProgress(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
  const { lessonId } = req.params;
  const { completed, score } = req.body as { completed: boolean; score?: number };
  res.json({
    data: {
      userId: req.user.id,
      lessonId,
      completed,
      score: score ?? null,
      updatedAt: new Date().toISOString(),
    },
  });
}

export function getCourseProgress(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
  res.json({
    data: {
      userId: req.user.id,
      courseId: req.params.courseId,
      completedLessons: 9,
      totalLessons: 12,
      percentage: 75,
    },
  });
}
