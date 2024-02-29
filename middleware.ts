import { NextResponse, NextRequest } from 'next/server';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export default async function middleware(req: NextRequest) {
  let loggedIn = req.cookies.get('token');
  const user_role = req.cookies.get('user_role');

  const { pathname } = req.nextUrl;

  // if (loggedIn?.value && pathname === '/login') {
  //   return NextResponse.redirect(new URL('/mystore', req.url));
  // }

  if (user_role && pathname === '/dashboard') {
    const bytes = CryptoJS.AES.decrypt(user_role?.value, 'my-password');
    const admin = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (admin === 'user') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (!loggedIn?.value && pathname === '/mystore') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
