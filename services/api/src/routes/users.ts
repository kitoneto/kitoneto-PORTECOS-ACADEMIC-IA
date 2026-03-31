import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getAllUsers,
} from '../controllers/userController';
import { authenticate } from '../middlewares/auth';
import { apiLimiter, writeLimiter } from '../middlewares/rateLimit';

const router = Router();

router.get('/me', apiLimiter, authenticate, getProfile);
router.put('/me', apiLimiter, writeLimiter, authenticate, updateProfile);
router.get('/', apiLimiter, authenticate, getAllUsers); // admin only

export default router;
