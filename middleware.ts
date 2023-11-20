import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};

export default withAuth(
  async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    let hostname = req.headers
      .get('host')!
      .replace('.localhost:3001', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    if (
      hostname.includes('---') &&
      hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
    ) {
      hostname = `${hostname.split('---')[0]}.${
        process.env.NEXT_PUBLIC_ROOT_DOMAIN
      }`;
    }

    const searchParams = req.nextUrl.searchParams.toString();
    const path = `${url.pathname}${
      searchParams.length > 0 ? `?${searchParams}` : ''
    }`;

    const userAgent = req.headers.get('user-agent') || '';
    const isCrawler =
      /facebookexternalhit|baiduspider|bingbot|discordbot|duckduckbot|googlebot|linkedinbot|pinterestbot|slackbot|tiktokbot|twitterbot|yandexbot/i.test(
        userAgent,
      );

    if (isCrawler) {
      return NextResponse.next();
    }

    if (
      hostname === `labs.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
      hostname === 'localhost:3001'
    ) {
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
    }

    if (
      hostname === 'localhost:3001' ||
      hostname === `labs.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    ) {
      return NextResponse.rewrite(
        new URL(`${path === '/' ? '' : path}`, req.url),
      );
    }

    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);
