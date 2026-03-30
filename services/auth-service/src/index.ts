import express from 'express';
import dotenv from 'dotenv';
import { login, register, refreshToken, forgotPassword } from './auth';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.AUTH_SERVICE_PORT ?? 4001;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'PORTECOS Auth Service' });
});

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/refresh', refreshToken);
app.post('/api/auth/forgot-password', forgotPassword);

app.listen(PORT, () => {
  console.log(`🔐 PORTECOS Auth Service running on http://localhost:${PORT}`);
});
