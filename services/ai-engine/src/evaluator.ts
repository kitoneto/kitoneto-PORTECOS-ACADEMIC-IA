import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface EvaluatorInput {
  answer: string;
  question: string;
  expectedAnswer: string;
  area: string;
}

interface EvaluationResult {
  isCorrect: boolean;
  score: number; // 0-100
  feedback: string;
  hints: string[];
}

export async function evaluateAnswer({
  answer,
  question,
  expectedAnswer,
  area,
}: EvaluatorInput): Promise<EvaluationResult> {
  const prompt = `
Você é um avaliador técnico especializado em ${area} para Angola.

Pergunta: ${question}
Resposta esperada: ${expectedAnswer}
Resposta do aluno: ${answer}

Avalie a resposta do aluno e responda em JSON com:
- isCorrect: boolean
- score: number (0-100)
- feedback: string (em português, max 100 palavras)
- hints: string[] (array de dicas para melhorar, max 3 itens)

Responda APENAS com o JSON, sem markdown.
`;

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content ?? '{}';
  return JSON.parse(content) as EvaluationResult;
}
