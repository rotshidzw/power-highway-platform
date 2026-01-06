import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromHeader } from './lib/session';
import { hasAccess } from './lib/permissions';

export const config = {
  matcher: ['/app/:path*'],
};

export function middleware(request: NextRequest) {
  const session = getSessionFromHeader(request.headers.get('cookie'));
  const nextUrl = request.nextUrl.clone();

  if (!session) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('next', nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (!hasAccess(session.role, nextUrl.pathname)) {
    return NextResponse.rewrite(new URL('/403', request.url));
  }

  return NextResponse.next();
}
