import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { users, generateTokens } from '@/lib/auth-helpers';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corpo do pedido inválido' }, { status: 400 });
  }

  const { email, password } = body as { email?: string; password?: string };

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
  }
  if (!password || typeof password !== 'string') {
    return NextResponse.json({ error: 'Palavra-passe inválida' }, { status: 400 });
  }

  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }

  const tokens = generateTokens(user.id, user.email, user.role);

  return NextResponse.json({
    data: {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      ...tokens,
    },
  });
}
