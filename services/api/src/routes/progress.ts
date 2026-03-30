import { Router } from 'express';
import {
  getUserProgress,
  updateProgress,
  getCourseProgress,
} from '../controllers/progressController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/me', authenticate, getUserProgress);
router.put('/lesson/:lessonId', authenticate, updateProgress);
router.get('/course/:courseId', authenticate, getCourseProgress);

export default router;
