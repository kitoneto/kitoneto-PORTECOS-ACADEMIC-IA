// GET /api/compliance/curriculum
// Returns the MES curriculum mapping for a given program

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const programId = searchParams.get('programId');

  if (!programId) {
    return NextResponse.json(
      { error: 'O parâmetro programId é obrigatório.' },
      { status: 400 }
    );
  }

  try {
    const { MESComplianceService } = await import(
      '@services/ai-engine/src/mes-compliance'
    );
    const service = new MESComplianceService();

    const studentId = searchParams.get('studentId');

    if (studentId) {
      // Return student-specific compliance status
      const compliance = await service.checkStudentCompliance(studentId, programId);
      return NextResponse.json({ data: compliance });
    }

    // Return the full curriculum mapping for the program
    const curriculum = await service.getProgramCurriculum(programId);
    return NextResponse.json({ data: curriculum });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno do servidor.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
