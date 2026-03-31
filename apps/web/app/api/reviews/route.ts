// GET  /api/reviews  — list pending reviews for a professor
// POST /api/reviews  — submit a review decision

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reviewerId = searchParams.get('reviewerId');

  if (!reviewerId) {
    return NextResponse.json(
      { error: 'O parâmetro reviewerId é obrigatório.' },
      { status: 400 }
    );
  }

  try {
    const { HumanReviewService } = await import(
      '../../../../services/ai-engine/src/human-review'
    );
    const service = new HumanReviewService();
    const reviews = await service.getPendingReviews(reviewerId);

    return NextResponse.json({ data: reviews });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno do servidor.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, reviewerId, decision, notes } = body as {
      reviewId?: string;
      reviewerId?: string;
      decision?: 'approved' | 'rejected' | 'revision_needed';
      notes?: string;
    };

    if (!reviewId || !reviewerId || !decision) {
      return NextResponse.json(
        { error: 'Os campos reviewId, reviewerId e decision são obrigatórios.' },
        { status: 400 }
      );
    }

    const validDecisions = ['approved', 'rejected', 'revision_needed'];
    if (!validDecisions.includes(decision)) {
      return NextResponse.json(
        { error: `Decisão inválida. Valores aceites: ${validDecisions.join(', ')}.` },
        { status: 400 }
      );
    }

    const { HumanReviewService } = await import(
      '../../../../services/ai-engine/src/human-review'
    );
    const service = new HumanReviewService();
    const result = await service.processReview(reviewId, reviewerId, decision, notes ?? '');

    return NextResponse.json({ data: result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno do servidor.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
