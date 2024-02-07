import { NextResponse, NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  let loggedIn = req.cookies.get('token');
  const { pathname } = req.nextUrl;

  if (loggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!loggedIn && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
