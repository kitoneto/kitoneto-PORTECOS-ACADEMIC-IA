import express from 'express';
import dotenv from 'dotenv';
import { askTutor } from './tutor';
import { evaluateAnswer } from './evaluator';
import { getRecommendations } from './recommender';
import { lessonGenerator } from './lesson-generator';
import { videoGenerator } from './video-generator';
import { contentPipeline } from './content-pipeline';

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

// Lesson generation endpoint
app.post('/api/ai/generate-lessons', async (req, res) => {
  try {
    const { competencyId, title, description, areaSlug } = req.body;
    const lessons = await lessonGenerator.generateLessonsForCompetency(
      competencyId, title, description, areaSlug
    );
    res.json({ data: lessons });
  } catch (error) {
    res.status(500).json({ error: 'Erro na geração de lições' });
  }
});

// Video generation endpoint
app.post('/api/ai/generate-video', async (req, res) => {
  try {
    const { lesson } = req.body;
    const result = await videoGenerator.generateVideoForLesson(lesson);
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Erro na geração de vídeo' });
  }
});

// Full content pipeline endpoint
app.post('/api/ai/generate-course-content', async (req, res) => {
  try {
    const { competencyId, title, description, areaSlug, courseId } = req.body;
    const result = await contentPipeline.generateFullCourseContent(
      competencyId, title, description, areaSlug, courseId
    );
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Erro no pipeline de conteúdo' });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 PORTECOS AI Engine running on http://localhost:${PORT}`);
});
