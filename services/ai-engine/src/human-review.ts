// Human review management service
// Some assessments require human professor validation after AI evaluation

import type { HumanReviewRequirement } from '../../../shared/types';
import { getSupabaseServer } from '../../../shared/lib/supabase';

function getSupabase() {
  if (!process.env.SUPABASE_URL) return null;
  try {
    return getSupabaseServer();
  } catch {
    return null;
  }
}

// In-memory store used when Supabase is not available (development)
const devReviewStore = new Map<string, HumanReviewRequirement>();

export class HumanReviewService {
  /**
   * Returns true if the given assessment requires human professor review.
   * Checks the human_review_requirements table; falls back to false in dev mode.
   */
  async requiresHumanReview(assessmentId: string): Promise<boolean> {
    const db = getSupabase();

    if (!db) return false;

    const { data, error } = await db
      .from('human_review_requirements')
      .select('requires_human')
      .eq('assessment_id', assessmentId)
      .maybeSingle();

    if (error) throw new Error(`Erro ao verificar revisão humana: ${error.message}`);

    return data?.requires_human ?? false;
  }

  /**
   * Submits an AI-evaluated submission for human professor review.
   * Creates or updates a review record with status 'pending'.
   */
  async submitForReview(
    assessmentId: string,
    studentSubmissionId: string,
    aiEvaluation: unknown
  ): Promise<{ reviewId: string; status: 'pending'; message: string }> {
    const db = getSupabase();

    if (!db) {
      // Dev fallback
      const reviewId = `dev-review-${Date.now()}`;
      const record: HumanReviewRequirement = {
        id: reviewId,
        assessmentId,
        requiresHuman: true,
        reviewStatus: 'pending',
        createdAt: new Date().toISOString(),
      };
      devReviewStore.set(reviewId, record);
      return {
        reviewId,
        status: 'pending',
        message: 'Submetido para revisão humana (modo desenvolvimento).',
      };
    }

    const { data, error } = await db
      .from('human_review_requirements')
      .upsert(
        {
          assessment_id: assessmentId,
          requires_human: true,
          review_status: 'pending',
          review_notes: JSON.stringify({ submissionId: studentSubmissionId, aiEvaluation }),
        },
        { onConflict: 'assessment_id' }
      )
      .select('id')
      .single();

    if (error) throw new Error(`Erro ao submeter para revisão: ${error.message}`);

    return {
      reviewId: data.id,
      status: 'pending',
      message: 'Submetido para revisão pelo professor. Aguarde a decisão.',
    };
  }

  /**
   * Professor approves, rejects, or requests revision for a submitted review.
   * Called from the admin panel.
   */
  async processReview(
    reviewId: string,
    reviewerId: string,
    decision: 'approved' | 'rejected' | 'revision_needed',
    notes: string
  ): Promise<HumanReviewRequirement> {
    const db = getSupabase();

    if (!db) {
      const record = devReviewStore.get(reviewId);
      if (!record) throw new Error('Revisão não encontrada.');
      const updated: HumanReviewRequirement = {
        ...record,
        reviewerId,
        reviewStatus: decision,
        reviewNotes: notes,
        reviewedAt: new Date().toISOString(),
      };
      devReviewStore.set(reviewId, updated);
      return updated;
    }

    const { data, error } = await db
      .from('human_review_requirements')
      .update({
        reviewer_id: reviewerId,
        review_status: decision,
        review_notes: notes,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', reviewId)
      .select()
      .single();

    if (error) throw new Error(`Erro ao processar revisão: ${error.message}`);

    return {
      id: data.id,
      assessmentId: data.assessment_id,
      requiresHuman: data.requires_human,
      reviewerId: data.reviewer_id,
      reviewStatus: data.review_status,
      reviewNotes: data.review_notes,
      reviewedAt: data.reviewed_at,
      createdAt: data.created_at,
    };
  }

  /**
   * Returns all reviews with status 'pending' assigned to or visible by a professor.
   */
  async getPendingReviews(reviewerId: string): Promise<HumanReviewRequirement[]> {
    const db = getSupabase();

    if (!db) {
      return Array.from(devReviewStore.values()).filter(
        (r) => r.reviewStatus === 'pending'
      );
    }

    const { data, error } = await db
      .from('human_review_requirements')
      .select('*')
      .eq('review_status', 'pending')
      .or(`reviewer_id.eq.${reviewerId},reviewer_id.is.null`);

    if (error) throw new Error(`Erro ao buscar revisões pendentes: ${error.message}`);

    return (data ?? []).map((row: Record<string, unknown>) => ({
      id: row.id as string,
      assessmentId: row.assessment_id as string,
      requiresHuman: row.requires_human as boolean,
      reviewerId: row.reviewer_id as string | undefined,
      reviewStatus: row.review_status as HumanReviewRequirement['reviewStatus'],
      reviewNotes: row.review_notes as string | undefined,
      reviewedAt: row.reviewed_at as string | undefined,
      createdAt: row.created_at as string,
    }));
  }
}

export const humanReviewService = new HumanReviewService();
