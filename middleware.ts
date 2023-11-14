import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req) {
    const userAgent = req.headers.get('user-agent') || '';
    const isCrawler =
      /facebookexternalhit|baiduspider|bingbot|discordbot|duckduckbot|googlebot|linkedinbot|pinterestbot|slackbot|tiktokbot|twitterbot|yandexbot/i.test(
        userAgent,
      );

    if (isCrawler) {
      return NextResponse.next();
    }

    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register');

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/docs/:path*',
    '/guides/:path*',
    '/insights/:path*',
    '/learn/:path*',
    '/tools/:path*',
    '/login',
    '/register',
  ],
};
