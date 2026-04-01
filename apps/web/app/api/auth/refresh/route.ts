import { NextRequest, NextResponse } from 'next/server';
import { users, generateTokens, verifyRefreshToken } from '@/lib/auth-helpers';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corpo do pedido inválido' }, { status: 400 });
  }

  const { refreshToken } = body as { refreshToken?: string };
  if (!refreshToken || typeof refreshToken !== 'string') {
    return NextResponse.json({ error: 'Refresh token necessário' }, { status: 400 });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = users.find((u) => u.id === payload.id);
    if (!user) {
      return NextResponse.json({ error: 'Utilizador não encontrado' }, { status: 401 });
    }

    const tokens = generateTokens(user.id, user.email, user.role);
    return NextResponse.json({ data: tokens });
  } catch {
    return NextResponse.json({ error: 'Refresh token inválido' }, { status: 401 });
  }
}
