// AI Assessor Service — PORTECOS ACADEMIC IA
// Generates adaptive assessments and evaluates competency submissions (CBE model)

import type { Assessment, AssessmentResult } from '../../../shared/types';

type CompetencyVerdict = 'competent' | 'not_yet_competent';
type DifficultyLevel = 'foundation' | 'intermediate' | 'advanced';

interface GeneratedAssessment {
  competencyId: string;
  title: string;
  type: 'quiz' | 'project' | 'exam';
  difficulty: DifficultyLevel;
  questions?: AssessmentQuestion[];
  projectBrief?: ProjectBrief;
  rubric: RubricCriteria[];
  estimatedDuration: number; // minutes
  passingThreshold: number;  // 0–100
}

interface AssessmentQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  competencyAspect: string;
}

interface ProjectBrief {
  title: string;
  description: string;
  deliverables: string[];
  angolianContext: string;
  evaluationCriteria: string[];
}

interface RubricCriteria {
  criterion: string;
  weight: number;
  competentDescriptor: string;
  notYetDescriptor: string;
}

interface EvaluationResult {
  submissionId: string;
  verdict: CompetencyVerdict;
  score: number;
  criteriaScores: { criterion: string; score: number; feedback: string }[];
  overallFeedback: string;
  improvementAreas: string[];
  nextSteps: string[];
}

// OpenAI-compatible message interface
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callLLM(messages: ChatMessage[]): Promise<string> {
  // Production: replace with actual LLM API client
  const lastUser = messages.filter((m) => m.role === 'user').pop();
  return `[Assessor AI response to: "${lastUser?.content?.slice(0, 80) ?? ''}..."]`;
}

export class AssessorService {
  private systemPrompt: string;

  constructor(systemPrompt?: string) {
    this.systemPrompt = systemPrompt ?? `
      You are an expert CBE assessor for PORTECOS ACADEMIC IA.
      Evaluate competencies using the Competent / Not Yet Competent model.
      There are NO grades — only mastery determination.
      Always provide constructive, specific feedback in Portuguese (pt-AO).
      Reference Angolan engineering standards and contexts where appropriate.
    `;
  }

  /**
   * Generates an adaptive assessment for a given competency and difficulty level.
   * The assessment type (quiz, project, exam) is chosen based on the competency nature.
   */
  async generateAssessment(
    competencyId: string,
    difficulty: DifficultyLevel = 'intermediate'
  ): Promise<GeneratedAssessment> {
    const messages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      {
        role: 'user',
        content: `Generate a CBE assessment for competency "${competencyId}" at "${difficulty}" level.
        Include questions or project brief, rubric, and Angolan engineering context.
        Return as JSON-structured content.`,
      },
    ];

    await callLLM(messages);

    // Structured mock output (production: parse LLM JSON response)
    const assessment: GeneratedAssessment = {
      competencyId,
      title: `Avaliação de Competência — ${competencyId}`,
      type: difficulty === 'foundation' ? 'quiz' : difficulty === 'advanced' ? 'project' : 'exam',
      difficulty,
      questions: difficulty === 'foundation' ? this.generateMockQuestions(competencyId) : undefined,
      projectBrief: difficulty !== 'foundation' ? this.generateMockProjectBrief(competencyId) : undefined,
      rubric: this.generateRubric(competencyId),
      estimatedDuration: difficulty === 'foundation' ? 30 : difficulty === 'intermediate' ? 90 : 180,
      passingThreshold: 70,
    };

    return assessment;
  }

  /**
   * Evaluates a submitted project or exam response for a given competency.
   * Returns a detailed evaluation with pass/fail verdict and feedback.
   */
  async evaluateSubmission(
    submissionId: string,
    content: string
  ): Promise<EvaluationResult> {
    const messages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      {
        role: 'user',
        content: `Evaluate this CBE submission (ID: ${submissionId}):
        Content: ${content.slice(0, 2000)}
        
        Apply CBE rubric. Determine if student is Competent or Not Yet Competent.
        Provide specific, actionable feedback in Portuguese.`,
      },
    ];

    const aiResponse = await callLLM(messages);

    // In production: parse structured JSON from LLM
    // TODO: Replace with actual LLM response parsing that extracts a numeric score from
    // the structured JSON returned by callLLM. The random fallback is a placeholder only
    // for development until the LLM integration is wired up end-to-end.
    const score = Math.floor(Math.random() * 40) + 60; // placeholder: 60–100

    return {
      submissionId,
      verdict: score >= 70 ? 'competent' : 'not_yet_competent',
      score,
      criteriaScores: [
        { criterion: 'Compreensão dos Conceitos', score: score - 5, feedback: aiResponse },
        { criterion: 'Aplicação Prática', score: score + 3, feedback: 'Boa aplicação ao contexto angolano.' },
        { criterion: 'Qualidade da Solução', score: score, feedback: 'Solução adequada para o nível exigido.' },
      ],
      overallFeedback: score >= 70
        ? 'Demonstraste competência nos critérios avaliados. Parabéns!'
        : 'Ainda não atingiste o nível de competência. Revê os materiais indicados e tenta novamente.',
      improvementAreas: score < 70
        ? ['Aprofunda os conceitos fundamentais', 'Pratica mais exercícios aplicados', 'Consulta o Mentor IA']
        : [],
      nextSteps: score >= 70
        ? ['Avança para a próxima competência', 'Mantém o ritmo de estudo']
        : ['Revê os materiais da competência', 'Realiza os exercícios práticos', 'Submete novamente em 48h'],
    };
  }

  /**
   * Determines final competency status based on multiple assessment results.
   * Implements CBE mastery model — requires consistent demonstration of competency.
   */
  determineCompetency(results: AssessmentResult[]): CompetencyVerdict {
    if (results.length === 0) return 'not_yet_competent';

    // Student is competent if their most recent attempt is competent
    // AND they passed on at least half of all attempts
    const latestResult = results.sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    )[0];

    const competentAttempts = results.filter((r) => r.status === 'competent').length;
    const competentRatio = competentAttempts / results.length;

    if (latestResult.status === 'competent' && competentRatio >= 0.5) {
      return 'competent';
    }

    return 'not_yet_competent';
  }

  // ── Private helpers ──────────────────────────────────────────────────────────

  private generateMockQuestions(competencyId: string): AssessmentQuestion[] {
    return Array.from({ length: 5 }, (_, i) => ({
      id: `q${i + 1}`,
      text: `Questão ${i + 1} sobre ${competencyId}: Qual é a abordagem correcta para...`,
      options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
      correctIndex: 1,
      explanation: 'A opção B é correcta porque segue os padrões de engenharia angolanos.',
      competencyAspect: `Aspecto ${i + 1} da competência`,
    }));
  }

  private generateMockProjectBrief(competencyId: string): ProjectBrief {
    return {
      title: `Projecto Prático — ${competencyId}`,
      description: `Resolução de um problema real de engenharia em contexto angolano relacionado com ${competencyId}.`,
      deliverables: ['Relatório técnico (PDF)', 'Cálculos justificativos', 'Memória descritiva'],
      angolianContext: 'O projecto deve considerar as condições climáticas de Angola, materiais localmente disponíveis e as normas angolanas aplicáveis.',
      evaluationCriteria: ['Correcção técnica', 'Adequação ao contexto', 'Qualidade da apresentação', 'Segurança e conformidade'],
    };
  }

  private generateRubric(competencyId: string): RubricCriteria[] {
    return [
      {
        criterion: 'Compreensão dos Conceitos Fundamentais',
        weight: 30,
        competentDescriptor: 'Demonstra compreensão clara e correcta dos conceitos-chave da competência.',
        notYetDescriptor: 'Conceitos fundamentais incorrectos ou ausentes na resposta.',
      },
      {
        criterion: 'Aplicação Prática em Contexto Angolano',
        weight: 40,
        competentDescriptor: 'Aplica os conceitos correctamente a situações práticas relevantes para Angola.',
        notYetDescriptor: 'Não consegue aplicar os conceitos ou ignora o contexto angolano.',
      },
      {
        criterion: 'Resolução de Problemas',
        weight: 30,
        competentDescriptor: 'Resolve problemas de forma sistemática, com raciocínio claro e soluções válidas.',
        notYetDescriptor: 'Processo de resolução incompleto ou com erros significativos.',
      },
    ];
  }
}

export const assessorService = new AssessorService();
