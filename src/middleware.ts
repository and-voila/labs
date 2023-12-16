import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

import { APP_BP } from '#/lib/const';

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const VERCEL_DEPLOYMENT_SUFFIX =
  process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX;
const LOCALHOST = 'localhost:3001';

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|images/|[\\w-]+\\.\\w+).*)'],
};

export default withAuth(middleware, {
  callbacks: {
    async authorized() {
      return true;
    },
  },
});

async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = processHostname(req);
  const path = constructPath(url);

  if (
    isPublicPath(hostname, path) ||
    isCrawler(req.headers.get('user-agent'))
  ) {
    return NextResponse.next();
  }

  if (hostname === `labs.${ROOT_DOMAIN}` || hostname === LOCALHOST) {
    return await handleAuthLogic(req);
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}

function processHostname(req: NextRequest): string {
  let hostname = req.headers
    .get('host')!
    .replace(`.${LOCALHOST}`, `.${ROOT_DOMAIN}`);

  if (
    hostname.includes('---') &&
    hostname.endsWith(`.${VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split('---')[0]}.${ROOT_DOMAIN}`;
  }

  return hostname;
}

function constructPath(url: URL): string {
  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`;
  return path;
}

function isPublicPath(hostname: string, path: string): boolean {
  return (
    (hostname === `labs.${ROOT_DOMAIN}` || hostname === LOCALHOST) &&
    (path === '/' ||
      path === '/pricing' ||
      path === '/blog' ||
      path.startsWith('/blog/') ||
      path === '/not-authorized')
  );
}

function isCrawler(userAgent: string | null): boolean {
  const crawlerUserAgents = [
    'facebookexternalhit',
    'baiduspider',
    'bingbot',
    'discordbot',
    'duckduckbot',
    'googlebot',
    'linkedinbot',
    'pinterestbot',
    'slackbot',
    'tiktokbot',
    'twitterbot',
    'yandexbot',
  ];

  return crawlerUserAgents.some(
    (crawlerUserAgent) => userAgent?.toLowerCase().includes(crawlerUserAgent),
  );
}

async function handleAuthLogic(req: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req });
  const isAuth = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register');

  if (isAuthPage) {
    if (isAuth) {
      const from =
        req.nextUrl.searchParams.get('from') || `${APP_BP}/settings/workspaces`;
      return NextResponse.redirect(new URL(from, req.url));
    }
    return NextResponse.next();
  }

  if (!isAuth) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/register?from=${encodeURIComponent(from)}`, req.url),
    );
  }

  return NextResponse.next();
}
