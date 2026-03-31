// GET /api/compliance/prerequisites
// Checks if a student can attempt a competency based on prerequisite chain

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');
  const competencyId = searchParams.get('competencyId');

  if (!studentId || !competencyId) {
    return NextResponse.json(
      { error: 'Os parâmetros studentId e competencyId são obrigatórios.' },
      { status: 400 }
    );
  }

  try {
    // Dynamic import avoids bundling Supabase on the client side
    const { PrerequisiteChecker } = await import(
      '../../../../../services/ai-engine/src/prerequisite-checker'
    );
    const checker = new PrerequisiteChecker();
    const result = await checker.canAttempt(studentId, competencyId);

    return NextResponse.json({ data: result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno do servidor.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
