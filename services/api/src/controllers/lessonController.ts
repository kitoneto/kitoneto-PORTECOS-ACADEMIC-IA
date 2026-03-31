import type { Request, Response, NextFunction } from 'express';

const lessons = [
  {
    id: 'l1',
    courseId: '1',
    title: 'O que é Solo Laterítico?',
    order: 1,
    type: 'concept',
    content: 'Introdução ao solo laterítico e suas propriedades geotécnicas.',
  },
  {
    id: 'l2',
    courseId: '1',
    title: 'Cálculo de Sapatas em Luanda',
    order: 2,
    type: 'problem',
    content: 'Problema real: dimensionamento de sapata para edifício de 4 andares.',
  },
];

export function getLessonsByCourse(req: Request, res: Response) {
  const result = lessons.filter((l) => l.courseId === req.params.courseId);
  res.json({ data: result, total: result.length });
}

export function getLessonById(req: Request, res: Response, next: NextFunction) {
  const lesson = lessons.find((l) => l.id === req.params.id);
  if (!lesson) {
    const err = new Error('Lição não encontrada');
    (err as NodeJS.ErrnoException).statusCode = 404;
    return next(err);
  }
  res.json({ data: lesson });
}

export function createLesson(req: Request, res: Response) {
  const newLesson = { id: `l${lessons.length + 1}`, ...req.body };
  lessons.push(newLesson);
  res.status(201).json({ data: newLesson });
}

export function updateLesson(req: Request, res: Response, next: NextFunction) {
  const index = lessons.findIndex((l) => l.id === req.params.id);
  if (index === -1) {
    const err = new Error('Lição não encontrada');
    (err as NodeJS.ErrnoException).statusCode = 404;
    return next(err);
  }
  lessons[index] = { ...lessons[index], ...req.body };
  res.json({ data: lessons[index] });
}
