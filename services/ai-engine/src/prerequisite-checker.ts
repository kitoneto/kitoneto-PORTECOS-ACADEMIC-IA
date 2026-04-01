// Prerequisite validation service
// Checks if a student can attempt a competency based on prerequisite chain

import type { PrerequisiteCheckResult } from '../../../shared/types';
import { getSupabaseServer } from '../../../shared/lib/supabase';

function getSupabase() {
  if (!process.env.SUPABASE_URL) return null;
  try {
    return getSupabaseServer();
  } catch {
    return null;
  }
}

export class PrerequisiteChecker {
  /**
   * Checks whether a student has completed all prerequisites for a competency.
   * Prerequisites are satisfied when the student has a status of 'competent'
   * in assessment_results for assessments linked to those prerequisite competencies.
   */
  async canAttempt(
    studentId: string,
    competencyId: string
  ): Promise<PrerequisiteCheckResult> {
    const db = getSupabase();

    if (!db) {
      // Fallback for local development without Supabase
      return {
        allowed: true,
        missingPrerequisites: [],
        message: 'Modo de desenvolvimento: verificação de pré-requisitos desactivada.',
      };
    }

    const chain = await this.getPrerequisiteChain(competencyId);

    if (chain.length === 0) {
      return {
        allowed: true,
        missingPrerequisites: [],
        message: 'Sem pré-requisitos. Pode iniciar a avaliação.',
      };
    }

    // Find assessments for each prerequisite competency
    const { data: assessments, error: aErr } = await db
      .from('assessments')
      .select('id, competency_id')
      .in('competency_id', chain);

    if (aErr) throw new Error(`Erro ao buscar avaliações: ${aErr.message}`);

    const assessmentIds: string[] = (assessments ?? []).map((a: { id: string }) => a.id);

    if (assessmentIds.length === 0) {
      // No assessments exist for prerequisites yet — allow attempt
      return {
        allowed: true,
        missingPrerequisites: [],
        message: 'Sem avaliações de pré-requisitos registadas. Pode iniciar.',
      };
    }

    // Check which prerequisite competencies the student has passed
    const { data: results, error: rErr } = await db
      .from('assessment_results')
      .select('assessment_id, status')
      .eq('user_id', studentId)
      .eq('status', 'competent')
      .in('assessment_id', assessmentIds);

    if (rErr) throw new Error(`Erro ao buscar resultados: ${rErr.message}`);

    // Map passed assessment IDs back to competency IDs
    const passedAssessmentIds = new Set<string>(
      (results ?? []).map((r: { assessment_id: string }) => r.assessment_id)
    );

    const passedCompetencyIds = new Set<string>(
      (assessments ?? [])
        .filter((a: { id: string }) => passedAssessmentIds.has(a.id))
        .map((a: { competency_id: string }) => a.competency_id)
    );

    const missing = chain.filter((prereqId) => !passedCompetencyIds.has(prereqId));

    if (missing.length > 0) {
      return {
        allowed: false,
        missingPrerequisites: missing,
        message: `Não pode avançar. Faltam ${missing.length} pré-requisito(s) por completar.`,
      };
    }

    return {
      allowed: true,
      missingPrerequisites: [],
      message: 'Todos os pré-requisitos concluídos. Pode iniciar a avaliação.',
    };
  }

  /**
   * Returns the full list of prerequisite competency IDs for a given competency.
   * Resolves the chain recursively (single level — direct prerequisites only).
   */
  async getPrerequisiteChain(competencyId: string): Promise<string[]> {
    const db = getSupabase();

    if (!db) return [];

    const { data, error } = await db
      .from('competency_prerequisites')
      .select('prerequisite_id')
      .eq('competency_id', competencyId);

    if (error) throw new Error(`Erro ao buscar cadeia de pré-requisitos: ${error.message}`);

    return (data ?? []).map((row: { prerequisite_id: string }) => row.prerequisite_id);
  }

  /**
   * Returns the list of competency IDs that a student has unlocked in a program.
   * A competency is unlocked when all its prerequisites are 'competent'.
   */
  async getUnlockedCompetencies(studentId: string, programId: string): Promise<string[]> {
    const db = getSupabase();

    if (!db) return [];

    // Fetch all competencies in the program
    const { data: competencies, error: cErr } = await db
      .from('competencies')
      .select('id')
      .eq('program_id', programId);

    if (cErr) throw new Error(`Erro ao buscar competências: ${cErr.message}`);

    const unlocked: string[] = [];

    for (const { id } of competencies ?? []) {
      const result = await this.canAttempt(studentId, id);
      if (result.allowed) unlocked.push(id);
    }

    return unlocked;
  }
}

export const prerequisiteChecker = new PrerequisiteChecker();
