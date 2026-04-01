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

  const { email, password, name } = body as {
    email?: string;
    password?: string;
    name?: string;
  };

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return NextResponse.json(
      { error: 'A palavra-passe deve ter pelo menos 8 caracteres' },
      { status: 400 }
    );
  }
  if (!name || typeof name !== 'string' || name.length < 2) {
    return NextResponse.json({ error: 'Nome inválido (mínimo 2 caracteres)' }, { status: 400 });
  }

  if (users.find((u) => u.email === email)) {
    return NextResponse.json({ error: 'Email já registado' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const newUser = {
    id: String(users.length + 1),
    email,
    passwordHash,
    name,
    role: 'student',
  };
  users.push(newUser);

  const tokens = generateTokens(newUser.id, email, 'student');

  return NextResponse.json(
    {
      data: {
        user: { id: newUser.id, email, name, role: 'student' },
        ...tokens,
      },
    },
    { status: 201 }
  );
}
