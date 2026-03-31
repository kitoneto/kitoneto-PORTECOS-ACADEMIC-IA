import { rateLimit } from 'express-rate-limit';

/** General API rate limiter: 100 requests per 15 minutes per IP */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas tentativas. Por favor tente novamente mais tarde.' },
});

/** Stricter limiter for write operations: 20 requests per 15 minutes */
export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas tentativas. Por favor tente novamente mais tarde.' },
});
