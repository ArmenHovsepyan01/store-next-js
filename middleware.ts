import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export default async function middleware(req: NextRequest) {
  let loggedIn = req.cookies.get('token');

  const { pathname, searchParams } = req.nextUrl;

  if (pathname === '/api/auth/error') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname === '/dashboard') {
    const checked = req.cookies.get('checked');
    if (!checked) return NextResponse.redirect(new URL('/api/auth', req.url));
  }

  if (!loggedIn?.value && pathname === '/mystore') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (!loggedIn?.value && pathname === '/addresses') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
