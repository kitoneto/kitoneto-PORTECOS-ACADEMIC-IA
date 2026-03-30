import express from 'express';
import dotenv from 'dotenv';
import { askTutor } from './tutor';
import { evaluateAnswer } from './evaluator';
import { getRecommendations } from './recommender';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.AI_ENGINE_PORT ?? 5000;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'PORTECOS AI Engine', timestamp: new Date().toISOString() });
});

// Tutor endpoint
app.post('/api/ai/tutor', async (req, res) => {
  try {
    const { question, area, context } = req.body as {
      question: string;
      area: string;
      context?: string;
    };
    const response = await askTutor({ question, area, context });
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ error: 'Erro no tutor IA' });
  }
});

// Evaluator endpoint
app.post('/api/ai/evaluate', async (req, res) => {
  try {
    const { answer, question, expectedAnswer, area } = req.body as {
      answer: string;
      question: string;
      expectedAnswer: string;
      area: string;
    };
    const result = await evaluateAnswer({ answer, question, expectedAnswer, area });
    res.json({ data: result });
  } catch {
    res.status(500).json({ error: 'Erro na avaliação IA' });
  }
});

// Recommender endpoint
app.get('/api/ai/recommend/:userId', async (req, res) => {
  try {
    const recommendations = await getRecommendations(req.params.userId);
    res.json({ data: recommendations });
  } catch {
    res.status(500).json({ error: 'Erro nas recomendações IA' });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 PORTECOS AI Engine running on http://localhost:${PORT}`);
});
