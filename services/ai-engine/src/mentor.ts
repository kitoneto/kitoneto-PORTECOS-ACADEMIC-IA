// AI Mentor Service — PORTECOS ACADEMIC IA
// Provides personalized mentoring, study plans, motivation, and deadline management

import type { StudyPlan, WeeklyGoal } from '../../../shared/types';
import { callLLM } from './openai-client';
import { getStudentProgress } from '../../../shared/lib/database';

interface ProgressData {
  studentId: string;
  completedCompetencies: number;
  totalCompetencies: number;
  termProgress: number;
  daysRemaining: number;
  streak: number;
  lastActivity: string;
}

interface StudyPlanOutput {
  studentId: string;
  termId: string;
  weeklyGoals: WeeklyGoal[];
  generatedAt: string;
}

interface MotivationMessage {
  message: string;
  type: 'encouragement' | 'urgent' | 'celebration';
  actionItems: string[];
}

interface DeadlineAlert {
  daysRemaining: number;
  pendingCompetencies: number;
  isAtRisk: boolean;
  recommendation: string;
}

// OpenAI-compatible chat message interface
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class MentorService {
  private systemPrompt: string;

  constructor(systemPrompt?: string) {
    this.systemPrompt = systemPrompt ?? `
      You are a CBE Mentor for PORTECOS ACADEMIC IA, Angola's first virtual engineering university.
      You help students succeed through the Competency-Based Education model.
      Always respond in Portuguese (pt-AO). Be encouraging, specific, and practical.
      Reference Angolan context where relevant (Sonangol, ENDE, Luanda infrastructure, etc.).
    `;
  }

  /**
   * Analyzes a student's current progress and returns a detailed assessment.
   */
  async analyzeProgress(studentId: string): Promise<ProgressData> {
    let progress: ProgressData;

    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
      // Fetch real data from Supabase
      const data = await getStudentProgress(studentId);
      progress = {
        studentId: data.studentId,
        completedCompetencies: data.completedCompetencies,
        totalCompetencies: data.totalCompetencies,
        termProgress: data.termProgress,
        daysRemaining: data.daysRemaining,
        streak: data.streak,
        lastActivity: data.lastActivity,
      };
    } else {
      // Fallback mock data for development
      progress = {
        studentId,
        completedCompetencies: 8,
        totalCompetencies: 40,
        termProgress: 47,
        daysRemaining: 112,
        streak: 7,
        lastActivity: new Date().toISOString(),
      };
    }

    const messages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      { role: 'user', content: `Analyze progress for student ${studentId}: ${JSON.stringify(progress)}. Provide insights.` },
    ];

    await callLLM(messages);
    return progress;
  }

  /**
   * Generates a personalized weekly study plan for a student based on their progress
   * and remaining time in the term.
   */
  async generateWeeklyPlan(studentId: string): Promise<StudyPlanOutput> {
    const progress = await this.analyzeProgress(studentId);

    const weeksRemaining = Math.floor(progress.daysRemaining / 7);
    const competenciesLeft = progress.totalCompetencies - progress.completedCompetencies;
    const competenciesPerWeek = Math.ceil(competenciesLeft / Math.max(weeksRemaining, 1));

    const weeklyGoals: WeeklyGoal[] = Array.from({ length: Math.min(weeksRemaining, 8) }, (_, i) => ({
      week: i + 1,
      competencies: [`Competência ${progress.completedCompetencies + i * competenciesPerWeek + 1}`],
      targetCompletionDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
    }));

    const messages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      { role: 'user', content: `Create a study plan for student ${studentId}. They have ${competenciesLeft} competencies left and ${weeksRemaining} weeks. Plan: ${JSON.stringify(weeklyGoals)}` },
    ];

    await callLLM(messages);

    return {
      studentId,
      termId: `term-${Date.now()}`,
      weeklyGoals,
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Sends a motivational message when a student appears stuck or inactive.
   */
  async sendMotivation(studentId: string): Promise<MotivationMessage> {
    const progress = await this.analyzeProgress(studentId);
    const daysSinceActivity = Math.floor(
      (Date.now() - new Date(progress.lastActivity).getTime()) / (1000 * 60 * 60 * 24)
    );

    let type: MotivationMessage['type'] = 'encouragement';
    if (progress.daysRemaining < 30 && progress.termProgress < 60) type = 'urgent';
    if (progress.termProgress >= 90) type = 'celebration';

    const messages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      {
        role: 'user',
        content: `Student ${studentId} has been inactive for ${daysSinceActivity} days. 
        Progress: ${progress.termProgress}%, ${progress.daysRemaining} days remaining. 
        Generate a motivational message in Portuguese.`,
      },
    ];

    const aiResponse = await callLLM(messages);

    const actionItems = [
      'Retoma os teus estudos hoje — mesmo 30 minutos fazem diferença.',
      `Tens ${progress.daysRemaining} dias restantes. Continua a progredir!`,
      'O teu Mentor IA está sempre disponível para ajudar.',
    ];

    return {
      message: aiResponse,
      type,
      actionItems,
    };
  }

  /**
   * Checks whether a student is at risk of not completing their term on time
   * and generates deadline alerts with recommendations.
   */
  async checkTermDeadlines(studentId: string): Promise<DeadlineAlert> {
    const progress = await this.analyzeProgress(studentId);

    const expectedProgress = ((180 - progress.daysRemaining) / 180) * 100;
    const progressGap = expectedProgress - progress.termProgress;
    const isAtRisk = progressGap > 15 || (progress.daysRemaining < 45 && progress.termProgress < 70);

    const pendingCompetencies = Math.ceil(
      (progress.totalCompetencies * (1 - progress.termProgress / 100))
    );

    const messages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      {
        role: 'user',
        content: `Student deadline check: ${progress.daysRemaining} days left, ${progress.termProgress}% done. 
        At risk: ${isAtRisk}. Generate recommendation in Portuguese.`,
      },
    ];

    const recommendation = await callLLM(messages);

    return {
      daysRemaining: progress.daysRemaining,
      pendingCompetencies,
      isAtRisk,
      recommendation,
    };
  }

  /**
   * Handles a free-form chat message from a student and returns the mentor's reply.
   */
  async chat(studentId: string, userMessage: string, history: ChatMessage[] = []): Promise<string> {
    const messages: ChatMessage[] = [
      { role: 'system', content: this.systemPrompt },
      ...history.slice(-10), // keep last 10 messages for context
      { role: 'user', content: userMessage },
    ];

    return callLLM(messages);
  }
}

export const mentorService = new MentorService();
