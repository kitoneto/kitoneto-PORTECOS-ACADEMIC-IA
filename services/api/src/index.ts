import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import coursesRouter from './routes/courses';
import lessonsRouter from './routes/lessons';
import usersRouter from './routes/users';
import progressRouter from './routes/progress';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4000;

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.APP_URL ?? 'http://localhost:3000' }));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'PORTECOS API', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/courses', coursesRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/users', usersRouter);
app.use('/api/progress', progressRouter);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 PORTECOS API running on http://localhost:${PORT}`);
});

export default app;
