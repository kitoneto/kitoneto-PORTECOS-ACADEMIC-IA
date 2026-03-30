import { Router } from 'express';
import {
  getLessonsByCourse,
  getLessonById,
  createLesson,
  updateLesson,
} from '../controllers/lessonController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/course/:courseId', getLessonsByCourse);
router.get('/:id', getLessonById);
router.post('/', authenticate, createLesson);
router.put('/:id', authenticate, updateLesson);

export default router;
