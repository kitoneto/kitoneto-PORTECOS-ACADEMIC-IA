import { Router } from 'express';
import {
  getUserProgress,
  updateProgress,
  getCourseProgress,
} from '../controllers/progressController';
import { authenticate } from '../middlewares/auth';
import { apiLimiter, writeLimiter } from '../middlewares/rateLimit';

const router = Router();

router.get('/me', apiLimiter, authenticate, getUserProgress);
router.put('/lesson/:lessonId', apiLimiter, writeLimiter, authenticate, updateProgress);
router.get('/course/:courseId', apiLimiter, authenticate, getCourseProgress);

export default router;
