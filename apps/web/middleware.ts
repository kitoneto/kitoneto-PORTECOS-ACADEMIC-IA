import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /dashboard/* routes
  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  const token = req.cookies.get('portecos_access_token')?.value
    ?? req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET ?? 'default-secret'
    );
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
