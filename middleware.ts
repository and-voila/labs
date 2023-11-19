import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req) {
    let hostname = req.headers.get('host') || '';

    if (hostname.endsWith('.localhost:3001')) {
      hostname = hostname.replace(
        '.localhost:3001',
        `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      );
    } else if (
      hostname.includes('---') &&
      hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
    ) {
      hostname = `${hostname.split('---')[0]}.${
        process.env.NEXT_PUBLIC_ROOT_DOMAIN
      }`;
    }

    const mainAppDomain = `labs.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    const localAppDomain = 'localhost:3001';

    if (hostname !== localAppDomain && hostname !== mainAppDomain) {
      return NextResponse.next();
    }

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
        const from = req.nextUrl.searchParams.get('from') || '/dashboard';
        return NextResponse.redirect(new URL(from, req.url));
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

    if (hostname !== localAppDomain && hostname !== mainAppDomain) {
      if (!hostname.startsWith('app.') && !hostname.includes('labs')) {
        const path = req.nextUrl.pathname;
        const searchParams = req.nextUrl.searchParams.toString();
        const fullPath = `${path}${
          searchParams.length > 0 ? `?${searchParams}` : ''
        }`;

        return NextResponse.rewrite(
          new URL(`/${hostname}${fullPath}`, req.url),
        );
      }
    }

    return NextResponse.next();
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
    '/((?!api/|_next/|_static/|_vercel|pricing|not-authorized|blog(?:/.*)?$|\\w+\\.\\w+|$).*)',
  ],
};
