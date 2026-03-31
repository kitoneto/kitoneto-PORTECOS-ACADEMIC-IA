// MES Curriculum compliance service
// Validates that PORTECOS programs cover all mandatory MES disciplines

import type {
  MESCurriculumMapping,
  ComplianceCheckResult,
} from '../../../shared/types';

let supabase: ReturnType<typeof createSupabaseClient> | null = null;

function createSupabaseClient() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('@supabase/supabase-js');
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
}

function getSupabase() {
  if (!process.env.SUPABASE_URL) return null;
  if (!supabase) supabase = createSupabaseClient();
  return supabase;
}

export class MESComplianceService {
  /**
   * Returns all MES disciplines mapped to a given program.
   */
  async getProgramCurriculum(programId: string): Promise<MESCurriculumMapping[]> {
    const db = getSupabase();

    if (!db) {
      // Dev fallback: return empty curriculum
      return [];
    }

    const { data, error } = await db
      .from('mes_curriculum_mapping')
      .select('*')
      .eq('program_id', programId)
      .order('mes_year', { ascending: true })
      .order('mes_semester', { ascending: true });

    if (error) throw new Error(`Erro ao buscar currículo MES: ${error.message}`);

    return (data ?? []).map((row: Record<string, unknown>) => ({
      id: row.id as string,
      programId: row.program_id as string,
      mesDiscipline: row.mes_discipline as string,
      mesCode: row.mes_code as string | undefined,
      mesYear: row.mes_year as number,
      mesSemester: row.mes_semester as number,
      mesHours: row.mes_hours as number,
      competencyIds: row.competency_ids as string[],
      isMandatory: row.is_mandatory as boolean,
      createdAt: row.created_at as string,
    }));
  }

  /**
   * Checks whether a student has completed all mandatory MES disciplines in a program.
   * A discipline is considered complete when the student is 'competent' in all
   * competencies listed in its competency_ids array.
   */
  async checkStudentCompliance(
    studentId: string,
    programId: string
  ): Promise<ComplianceCheckResult> {
    const db = getSupabase();

    if (!db) {
      return {
        compliant: false,
        completedDisciplines: [],
        remainingDisciplines: [],
        progressPercentage: 0,
      };
    }

    const curriculum = await this.getProgramCurriculum(programId);
    const mandatory = curriculum.filter((d) => d.isMandatory);

    if (mandatory.length === 0) {
      return {
        compliant: true,
        completedDisciplines: [],
        remainingDisciplines: [],
        progressPercentage: 100,
      };
    }

    // Gather all competency IDs required across all mandatory disciplines
    const allCompetencyIds = [
      ...new Set(mandatory.flatMap((d) => d.competencyIds)),
    ];

    // Find assessments for these competencies
    const { data: assessments, error: aErr } = await db
      .from('assessments')
      .select('id, competency_id')
      .in('competency_id', allCompetencyIds);

    if (aErr) throw new Error(`Erro ao buscar avaliações: ${aErr.message}`);

    const assessmentIds = (assessments ?? []).map((a: { id: string }) => a.id);

    // Find competent results for this student
    const { data: results, error: rErr } = await db
      .from('assessment_results')
      .select('assessment_id')
      .eq('user_id', studentId)
      .eq('status', 'competent')
      .in('assessment_id', assessmentIds);

    if (rErr) throw new Error(`Erro ao buscar resultados: ${rErr.message}`);

    const passedAssessmentIds = new Set<string>(
      (results ?? []).map((r: { assessment_id: string }) => r.assessment_id)
    );

    const passedCompetencyIds = new Set<string>(
      (assessments ?? [])
        .filter((a: { id: string }) => passedAssessmentIds.has(a.id))
        .map((a: { competency_id: string }) => a.competency_id)
    );

    const completedDisciplines: string[] = [];
    const remainingDisciplines: string[] = [];

    for (const discipline of mandatory) {
      if (discipline.competencyIds.length === 0) {
        remainingDisciplines.push(discipline.mesDiscipline);
        continue;
      }
      const allPassed = discipline.competencyIds.every((cId) =>
        passedCompetencyIds.has(cId)
      );
      if (allPassed) {
        completedDisciplines.push(discipline.mesDiscipline);
      } else {
        remainingDisciplines.push(discipline.mesDiscipline);
      }
    }

    const progressPercentage =
      mandatory.length > 0
        ? Math.round((completedDisciplines.length / mandatory.length) * 100)
        : 100;

    return {
      compliant: remainingDisciplines.length === 0,
      completedDisciplines,
      remainingDisciplines,
      progressPercentage,
    };
  }

  /**
   * Validates that a program has competencies mapped to every required MES discipline.
   * A discipline is "covered" when its competency_ids array is non-empty.
   */
  async validateProgramCompleteness(programId: string): Promise<{
    isComplete: boolean;
    coveredDisciplines: string[];
    missingDisciplines: string[];
  }> {
    const curriculum = await this.getProgramCurriculum(programId);
    const mandatory = curriculum.filter((d) => d.isMandatory);

    const coveredDisciplines: string[] = [];
    const missingDisciplines: string[] = [];

    for (const discipline of mandatory) {
      if (discipline.competencyIds.length > 0) {
        coveredDisciplines.push(discipline.mesDiscipline);
      } else {
        missingDisciplines.push(discipline.mesDiscipline);
      }
    }

    return {
      isComplete: missingDisciplines.length === 0,
      coveredDisciplines,
      missingDisciplines,
    };
  }
}

export const mesComplianceService = new MESComplianceService();
