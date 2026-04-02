// Lesson Generator Service — PORTECOS ACADEMIC IA
// Autonomously generates full lesson sets from competency metadata using GPT-4o

import { callLLM } from './openai-client';
import type { ChatMessage } from './openai-client';
import type { GeneratedLesson } from '../../../shared/types';

const LESSON_SYSTEM_PROMPT = `You are an expert educational content creator for PORTECOS ACADEMIC IA,
Angola's first virtual engineering university.

Generate lesson content that:
- Is written entirely in Portuguese (pt-AO)
- References Angolan engineering context (Luanda infrastructure, Sonangol,
  ENDE, local materials, climate conditions, Angolan regulations)
- Uses clear, pedagogical language suitable for university students
- Includes practical examples relevant to Angola
- Follows the CBE (Competency-Based Education) model

Always return content as valid JSON with the exact structure requested.`;

export class LessonGeneratorService {
  private systemPrompt: string;

  constructor(systemPrompt?: string) {
    this.systemPrompt = systemPrompt ?? LESSON_SYSTEM_PROMPT;
  }

  /**
   * Generates a complete lesson set (2-3 concept + 1-2 problem + 1 quiz) for a competency.
   */
  async generateLessonsForCompetency(
    competencyId: string,
    competencyTitle: string,
    competencyDescription: string,
    areaSlug: string
  ): Promise<GeneratedLesson[]> {
    const lessons: GeneratedLesson[] = [];
    let order = 1;

    // 2 concept lessons
    for (let i = 0; i < 2; i++) {
      const topic = i === 0
        ? `${competencyTitle} — Fundamentos`
        : `${competencyTitle} — Aplicações e Técnicas`;
      const lesson = await this.generateConceptLesson(topic, areaSlug);
      lessons.push({ ...lesson, order: order++ });
    }

    // 1 problem lesson
    const problemLesson = await this.generateProblemLesson(competencyTitle, areaSlug);
    lessons.push({ ...problemLesson, order: order++ });

    // 1 quiz lesson
    const quizLesson = await this.generateQuizLesson(competencyTitle, areaSlug, lessons);
    lessons.push({ ...quizLesson, order: order++ });

    return lessons;
  }

  /**
   * Generates a single concept lesson using GPT-4o (or mock in dev mode).
   */
  async generateConceptLesson(topic: string, areaSlug: string): Promise<GeneratedLesson> {
    const messages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      {
        role: 'user',
        content: `Gera uma lição de CONCEITO sobre "${topic}" para a área de "${areaSlug}".

Devolve APENAS JSON válido com esta estrutura exacta:
{
  "title": "string em português",
  "type": "concept",
  "content": "texto markdown rico em português (mínimo 300 palavras, com contexto angolano)",
  "question": "questão de verificação de compreensão",
  "options": ["opção A", "opção B", "opção C", "opção D"],
  "correctAnswer": 0,
  "explanation": "explicação detalhada da resposta correcta",
  "xpReward": 10
}`,
      },
    ];

    const raw = await callLLM(messages, { temperature: 0.7, maxTokens: 1500 });
    return this.parseOrMockLesson(raw, 'concept', topic, 10);
  }

  /**
   * Generates a practical problem lesson with Angolan context.
   */
  async generateProblemLesson(topic: string, areaSlug: string): Promise<GeneratedLesson> {
    const messages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      {
        role: 'user',
        content: `Gera uma lição de PROBLEMA PRÁTICO sobre "${topic}" para a área de "${areaSlug}".

O problema deve:
- Ser realista para Angola (ex.: construção em Luanda, extracção petrolífera em Cabinda, instalação solar no Namibe)
- Incluir dados numéricos e cálculos onde apropriado
- Ter solução passo-a-passo na explicação

Devolve APENAS JSON válido com esta estrutura exacta:
{
  "title": "string em português",
  "type": "problem",
  "content": "enunciado do problema em markdown (incluir dados, contexto angolano, diagrama textual se necessário)",
  "question": "questão sobre a resolução do problema",
  "options": ["opção A", "opção B", "opção C", "opção D"],
  "correctAnswer": 0,
  "explanation": "solução detalhada passo-a-passo",
  "xpReward": 15
}`,
      },
    ];

    const raw = await callLLM(messages, { temperature: 0.7, maxTokens: 1500 });
    return this.parseOrMockLesson(raw, 'problem', topic, 15);
  }

  /**
   * Generates a comprehensive quiz lesson that tests knowledge from previous lessons.
   */
  async generateQuizLesson(
    topic: string,
    areaSlug: string,
    previousLessons: GeneratedLesson[]
  ): Promise<GeneratedLesson> {
    const lessonTitles = previousLessons.map((l) => l.title).join(', ');

    const messages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      {
        role: 'user',
        content: `Gera uma lição de QUIZ abrangente sobre "${topic}" para a área de "${areaSlug}".
Este quiz testa o conhecimento das lições anteriores: ${lessonTitles}.

Devolve APENAS JSON válido com esta estrutura exacta:
{
  "title": "string em português",
  "type": "quiz",
  "content": "introdução ao quiz em markdown",
  "question": "questão desafiante que integra os conceitos das lições anteriores",
  "options": ["opção A", "opção B", "opção C", "opção D"],
  "correctAnswer": 0,
  "explanation": "explicação completa integrando os conceitos estudados",
  "xpReward": 20
}`,
      },
    ];

    const raw = await callLLM(messages, { temperature: 0.6, maxTokens: 1200 });
    return this.parseOrMockLesson(raw, 'quiz', topic, 20);
  }

  /**
   * Saves generated lessons to the Supabase `lessons` table.
   * Falls back to console logging in dev mode.
   */
  async saveLessonsToDatabase(courseId: string, lessons: GeneratedLesson[]): Promise<void> {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      console.log('[LessonGenerator] Dev mode — lessons not saved to DB (no Supabase config):');
      lessons.forEach((l, i) =>
        console.log(`  [${i + 1}] ${l.type.toUpperCase()} — ${l.title} (${l.xpReward} XP)`)
      );
      return;
    }

    const { saveLessons } = await import('../../../shared/lib/database');
    await saveLessons(courseId, lessons);
    console.log(`[LessonGenerator] Saved ${lessons.length} lessons for course ${courseId}`);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private parseOrMockLesson(
    raw: string,
    type: 'concept' | 'problem' | 'quiz',
    topic: string,
    xpReward: number
  ): GeneratedLesson {
    // Try to extract JSON from the LLM response
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as Partial<GeneratedLesson>;
        if (parsed.title && parsed.content) {
          return {
            title: parsed.title,
            order: 1,
            type: parsed.type ?? type,
            content: parsed.content,
            question: parsed.question,
            options: parsed.options,
            correctAnswer: typeof parsed.correctAnswer === 'number' ? parsed.correctAnswer : 0,
            explanation: parsed.explanation,
            xpReward: typeof parsed.xpReward === 'number' ? parsed.xpReward : xpReward,
          };
        }
      }
    } catch {
      // JSON parse failed — fall through to mock
    }

    return this.buildMockLesson(type, topic, xpReward);
  }

  private buildMockLesson(
    type: 'concept' | 'problem' | 'quiz',
    topic: string,
    xpReward: number
  ): GeneratedLesson {
    const typeLabels: Record<string, string> = {
      concept: 'Conceito',
      problem: 'Problema Prático',
      quiz: 'Quiz',
    };

    const mockContent: Record<string, string> = {
      concept: `## ${topic}\n\nEsta lição aborda os conceitos fundamentais de **${topic}** no contexto da engenharia angolana.\n\n### Contexto Nacional\n\nEm Angola, particularmente em Luanda e nas províncias petrolíferas como Cabinda, a aplicação correcta destes princípios é essencial para o desenvolvimento de infraestruturas modernas e sustentáveis.\n\n### Princípios Fundamentais\n\n1. **Análise técnica** — Avaliação sistemática dos parâmetros relevantes\n2. **Normas angolanas** — Conformidade com os regulamentos do Ministério das Obras Públicas\n3. **Materiais locais** — Utilização de recursos disponíveis no mercado angolano\n\n### Aplicação Prática\n\nOs engenheiros da ENDE e da Sonangol aplicam diariamente estes conceitos nos seus projectos de grande envergadura em todo o território nacional.`,
      problem: `## Problema Prático — ${topic}\n\n### Enunciado\n\nUma empresa de engenharia em Luanda necessita de resolver o seguinte problema relacionado com **${topic}**:\n\n**Dados do problema:**\n- Localização: Bairro Talatona, Luanda Sul\n- Condições climáticas: Temperatura média 26°C, humidade relativa 75%\n- Requisitos: Normas ANIP e regulamentos municipais de Luanda\n\n### Objectivo\n\nCalcular e dimensionar a solução técnica adequada, considerando os materiais disponíveis localmente e os custos em kwanzas (AOA).\n\n### Dados Técnicos\n\nConsidere os valores típicos para as condições angolanas e apresente uma solução completa com memória de cálculo.`,
      quiz: `## Quiz — ${topic}\n\nEste quiz avalia a compreensão dos conceitos estudados nas lições anteriores sobre **${topic}**.\n\nResponde com atenção a cada questão, aplicando os conhecimentos adquiridos sobre engenharia no contexto angolano.\n\n**Boa sorte!** 🎓`,
    };

    const mockQuestions: Record<string, string> = {
      concept: `Qual é o princípio fundamental de ${topic} mais aplicado nos projectos de engenharia em Angola?`,
      problem: `Qual é a solução técnica correcta para o problema de ${topic} apresentado, considerando as normas angolanas?`,
      quiz: `Integrando os conceitos estudados sobre ${topic}, qual abordagem é mais adequada para o contexto angolano?`,
    };

    return {
      title: `${typeLabels[type]}: ${topic}`,
      order: 1,
      type,
      content: mockContent[type] || mockContent.concept,
      question: mockQuestions[type] || mockQuestions.concept,
      options: [
        'Abordagem técnica normalizada conforme regulamentos angolanos',
        'Método empírico sem base normativa',
        'Importação directa de soluções europeias sem adaptação local',
        'Nenhuma das anteriores',
      ],
      correctAnswer: 0,
      explanation: `A primeira opção é a correcta porque segue os padrões estabelecidos pelas normas angolanas de engenharia, garantindo segurança, qualidade e conformidade legal. Esta abordagem é adoptada pelas principais empresas de engenharia em Angola, incluindo projectos da ENDE e da Sonangol.`,
      xpReward,
    };
  }
}

export const lessonGenerator = new LessonGeneratorService();
