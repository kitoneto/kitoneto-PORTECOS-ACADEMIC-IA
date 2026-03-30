import express from 'express';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';
import { login, register, refreshToken, forgotPassword } from './auth';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.AUTH_SERVICE_PORT ?? 4001;

/** Strict rate limiter for auth endpoints: 10 attempts per 15 minutes per IP */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas tentativas de autenticação. Tente novamente em 15 minutos.' },
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'PORTECOS Auth Service' });
});

app.post('/api/auth/register', authLimiter, register);
app.post('/api/auth/login', authLimiter, login);
app.post('/api/auth/refresh', authLimiter, refreshToken);
app.post('/api/auth/forgot-password', authLimiter, forgotPassword);

app.listen(PORT, () => {
  console.log(`🔐 PORTECOS Auth Service running on http://localhost:${PORT}`);
});
