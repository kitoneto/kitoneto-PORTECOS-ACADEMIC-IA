import type { Request, Response, NextFunction } from 'express';

// Placeholder data — replace with real DB queries
const courses = [
  {
    id: '1',
    title: 'Fundações em Solo Laterítico',
    area: 'engenharia-civil',
    level: 'intermediate',
    lessonCount: 12,
    description: 'Projete fundações seguras no solo laterítico de Luanda.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Perfuração Offshore — Cabinda',
    area: 'petroleo-gas',
    level: 'advanced',
    lessonCount: 18,
    description: 'Técnicas de perfuração em blocos offshore da Bacia do Congo.',
    createdAt: new Date().toISOString(),
  },
];

export function getAllCourses(_req: Request, res: Response) {
  res.json({ data: courses, total: courses.length });
}

export function getCourseById(req: Request, res: Response, next: NextFunction) {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    const err = new Error('Curso não encontrado');
    (err as NodeJS.ErrnoException).statusCode = 404;
    return next(err);
  }
  res.json({ data: course });
}

export function createCourse(req: Request, res: Response) {
  const newCourse = { id: String(courses.length + 1), ...req.body, createdAt: new Date().toISOString() };
  courses.push(newCourse);
  res.status(201).json({ data: newCourse });
}

export function updateCourse(req: Request, res: Response, next: NextFunction) {
  const index = courses.findIndex((c) => c.id === req.params.id);
  if (index === -1) {
    const err = new Error('Curso não encontrado');
    (err as NodeJS.ErrnoException).statusCode = 404;
    return next(err);
  }
  courses[index] = { ...courses[index], ...req.body };
  res.json({ data: courses[index] });
}

export function deleteCourse(req: Request, res: Response, next: NextFunction) {
  const index = courses.findIndex((c) => c.id === req.params.id);
  if (index === -1) {
    const err = new Error('Curso não encontrado');
    (err as NodeJS.ErrnoException).statusCode = 404;
    return next(err);
  }
  courses.splice(index, 1);
  res.status(204).send();
}
