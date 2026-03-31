import { NextRequest, NextResponse } from 'next/server';
import { mentorService } from '@services/ai-engine/src/mentor';

export async function POST(request: NextRequest) {
  const { studentId, message, history } = await request.json();

  if (!studentId || !message) {
    return NextResponse.json({ error: 'Missing studentId or message' }, { status: 400 });
  }

  const reply = await mentorService.chat(studentId, message, history);
  return NextResponse.json({ reply });
}
