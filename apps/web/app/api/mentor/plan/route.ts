import { NextRequest, NextResponse } from 'next/server';
import { mentorService } from '@services/ai-engine/src/mentor';

export async function POST(request: NextRequest) {
  const { studentId } = await request.json();

  if (!studentId) {
    return NextResponse.json({ error: 'Missing studentId' }, { status: 400 });
  }

  const plan = await mentorService.generateWeeklyPlan(studentId);
  return NextResponse.json({ plan });
}
