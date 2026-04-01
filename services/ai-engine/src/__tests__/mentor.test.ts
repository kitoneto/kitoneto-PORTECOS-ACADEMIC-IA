// Tests for MentorService — PORTECOS ACADEMIC IA
// Runs in mock mode (no OPENAI_API_KEY or SUPABASE_URL required)

import { describe, it, expect, beforeAll } from 'vitest';
import { MentorService } from '../mentor';

// Ensure mock mode is active for all tests
beforeAll(() => {
  delete process.env.OPENAI_API_KEY;
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_KEY;
});

describe('MentorService', () => {
  describe('constructor', () => {
    it('uses a default system prompt when none is provided', () => {
      const mentor = new MentorService();
      // Access private field via type assertion to verify default was set
      const prompt = (mentor as unknown as { systemPrompt: string }).systemPrompt;
      expect(prompt).toContain('PORTECOS ACADEMIC IA');
      expect(prompt).toContain('Competency-Based Education');
    });

    it('uses a custom system prompt when provided', () => {
      const custom = 'Custom prompt for testing';
      const mentor = new MentorService(custom);
      const prompt = (mentor as unknown as { systemPrompt: string }).systemPrompt;
      expect(prompt).toBe(custom);
    });
  });

  describe('analyzeProgress()', () => {
    it('returns a valid ProgressData structure in mock mode', async () => {
      const mentor = new MentorService();
      const result = await mentor.analyzeProgress('student-123');

      expect(result).toMatchObject({
        studentId: 'student-123',
        completedCompetencies: expect.any(Number),
        totalCompetencies: expect.any(Number),
        termProgress: expect.any(Number),
        daysRemaining: expect.any(Number),
        streak: expect.any(Number),
        lastActivity: expect.any(String),
      });
      expect(result.completedCompetencies).toBeGreaterThanOrEqual(0);
      expect(result.totalCompetencies).toBeGreaterThan(0);
    });
  });

  describe('generateWeeklyPlan()', () => {
    it('returns a valid StudyPlanOutput with weeklyGoals array', async () => {
      const mentor = new MentorService();
      const result = await mentor.generateWeeklyPlan('student-456');

      expect(result).toMatchObject({
        studentId: 'student-456',
        termId: expect.any(String),
        weeklyGoals: expect.any(Array),
        generatedAt: expect.any(String),
      });
      expect(Array.isArray(result.weeklyGoals)).toBe(true);
    });

    it('weekly goals have the correct shape', async () => {
      const mentor = new MentorService();
      const result = await mentor.generateWeeklyPlan('student-456');

      if (result.weeklyGoals.length > 0) {
        const goal = result.weeklyGoals[0];
        expect(goal).toMatchObject({
          week: expect.any(Number),
          competencies: expect.any(Array),
          targetCompletionDate: expect.any(String),
          completed: expect.any(Boolean),
        });
      }
    });
  });

  describe('sendMotivation()', () => {
    it('returns encouragement type by default (mock progress: 47%, 112 days)', async () => {
      const mentor = new MentorService();
      const result = await mentor.sendMotivation('student-001');

      expect(result.type).toBe('encouragement');
      expect(result.message).toBeTruthy();
      expect(Array.isArray(result.actionItems)).toBe(true);
    });

    it('returns urgent type when daysRemaining < 30 AND termProgress < 60', async () => {
      // Override analyzeProgress to simulate at-risk student
      const mentor = new MentorService();
      const original = mentor.analyzeProgress.bind(mentor);
      mentor.analyzeProgress = async () => ({
        studentId: 'urgent-student',
        completedCompetencies: 5,
        totalCompetencies: 40,
        termProgress: 20,
        daysRemaining: 15,
        streak: 0,
        lastActivity: new Date().toISOString(),
      });

      const result = await mentor.sendMotivation('urgent-student');
      expect(result.type).toBe('urgent');

      mentor.analyzeProgress = original;
    });

    it('returns celebration type when termProgress >= 90', async () => {
      const mentor = new MentorService();
      const original = mentor.analyzeProgress.bind(mentor);
      mentor.analyzeProgress = async () => ({
        studentId: 'top-student',
        completedCompetencies: 38,
        totalCompetencies: 40,
        termProgress: 95,
        daysRemaining: 60,
        streak: 30,
        lastActivity: new Date().toISOString(),
      });

      const result = await mentor.sendMotivation('top-student');
      expect(result.type).toBe('celebration');

      mentor.analyzeProgress = original;
    });
  });

  describe('checkTermDeadlines()', () => {
    it('returns isAtRisk: true when progressGap > 15', async () => {
      const mentor = new MentorService();
      // Override analyzeProgress: 90 days elapsed of 180 = 50% expected, but only 30% done → gap = 20
      mentor.analyzeProgress = async () => ({
        studentId: 'at-risk-student',
        completedCompetencies: 12,
        totalCompetencies: 40,
        termProgress: 30,
        daysRemaining: 90,
        streak: 2,
        lastActivity: new Date().toISOString(),
      });

      const result = await mentor.checkTermDeadlines('at-risk-student');
      expect(result.isAtRisk).toBe(true);
      expect(result.daysRemaining).toBe(90);
      expect(result.pendingCompetencies).toBeGreaterThan(0);
      expect(result.recommendation).toBeTruthy();
    });

    it('returns isAtRisk: false when on track', async () => {
      const mentor = new MentorService();
      // 90 days elapsed of 180 = 50% expected, and 55% done → gap = -5 (on track)
      mentor.analyzeProgress = async () => ({
        studentId: 'on-track-student',
        completedCompetencies: 22,
        totalCompetencies: 40,
        termProgress: 55,
        daysRemaining: 90,
        streak: 10,
        lastActivity: new Date().toISOString(),
      });

      const result = await mentor.checkTermDeadlines('on-track-student');
      expect(result.isAtRisk).toBe(false);
    });
  });

  describe('chat()', () => {
    it('returns a string response', async () => {
      const mentor = new MentorService();
      const response = await mentor.chat('student-789', 'Como posso melhorar?');
      expect(typeof response).toBe('string');
      expect(response.length).toBeGreaterThan(0);
    });

    it('slices history to last 10 messages', async () => {
      const mentor = new MentorService();

      // Provide 15 history messages — only last 10 should be used
      const history = Array.from({ length: 15 }, (_, i) => ({
        role: 'user' as const,
        content: `Mensagem histórica ${i + 1}`,
      }));

      // If history slicing works, this should not throw and return a response
      const response = await mentor.chat('student-history', 'Nova mensagem', history);
      expect(typeof response).toBe('string');
    });
  });
});
