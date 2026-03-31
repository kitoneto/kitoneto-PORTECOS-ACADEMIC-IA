import { Router } from 'express';
import {
  getLessonsByCourse,
  getLessonById,
  createLesson,
  updateLesson,
} from '../controllers/lessonController';
import { authenticate } from '../middlewares/auth';
import { apiLimiter, writeLimiter } from '../middlewares/rateLimit';

const router = Router();

router.get('/course/:courseId', apiLimiter, getLessonsByCourse);
router.get('/:id', apiLimiter, getLessonById);
router.post('/', apiLimiter, writeLimiter, authenticate, createLesson);
router.put('/:id', apiLimiter, writeLimiter, authenticate, updateLesson);

export default router;
