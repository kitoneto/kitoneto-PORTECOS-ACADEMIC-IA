import { Router } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController';
import { authenticate } from '../middlewares/auth';
import { apiLimiter, writeLimiter } from '../middlewares/rateLimit';

const router = Router();

router.get('/', apiLimiter, getAllCourses);
router.get('/:id', apiLimiter, getCourseById);
router.post('/', apiLimiter, writeLimiter, authenticate, createCourse);
router.put('/:id', apiLimiter, writeLimiter, authenticate, updateCourse);
router.delete('/:id', apiLimiter, writeLimiter, authenticate, deleteCourse);

export default router;
