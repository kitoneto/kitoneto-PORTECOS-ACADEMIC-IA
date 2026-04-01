import { NextRequest, NextResponse } from 'next/server';
import { assessorService } from '@services/ai-engine/src/assessor';

export async function POST(request: NextRequest) {
  const { submissionId, content } = await request.json();

  if (!submissionId || !content) {
    return NextResponse.json({ error: 'Missing submissionId or content' }, { status: 400 });
  }

  const result = await assessorService.evaluateSubmission(submissionId, content);
  return NextResponse.json({ result });
}
