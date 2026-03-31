import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const AREA_PROMPT_MAP: Record<string, string> = {
  'engenharia-civil': 'engenharia-civil.md',
  'petroleo-gas': 'petroleo-gas.md',
  'ambiente': 'ambiente.md',
  'mecanica': 'mecanica.md',
  'energias-renovaveis': 'energias-renovaveis.md',
  'eletricidade': 'eletricidade.md',
  'telecomunicacoes': 'telecomunicacoes.md',
  'inteligencia-artificial': 'inteligencia-artificial.md',
};

function loadPrompt(filename: string): string {
  const promptPath = path.join(__dirname, '..', 'prompts', filename);
  if (fs.existsSync(promptPath)) {
    return fs.readFileSync(promptPath, 'utf-8');
  }
  return '';
}

interface TutorInput {
  question: string;
  area: string;
  context?: string;
}

export async function askTutor({ question, area, context }: TutorInput): Promise<string> {
  const basePrompt = loadPrompt('tutor-system.md');
  const areaPrompt = loadPrompt(AREA_PROMPT_MAP[area] ?? 'tutor-system.md');

  const systemPrompt = [basePrompt, areaPrompt].filter(Boolean).join('\n\n');

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt || 'És o Tutor IA da PORTECOS ACADEMIC IA.' },
  ];

  if (context) {
    messages.push({ role: 'user', content: `Contexto da lição: ${context}` });
    messages.push({ role: 'assistant', content: 'Entendido. Estou pronto para ajudar com esta lição.' });
  }

  messages.push({ role: 'user', content: question });

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o',
    messages,
    temperature: 0.7,
    max_tokens: 1024,
  });

  return completion.choices[0]?.message?.content ?? 'Não foi possível obter resposta.';
}
