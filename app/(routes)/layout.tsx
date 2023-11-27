import '@/app/styles/globals.css';

import { Viewport } from 'next';
import { fontBricolage } from '@/public/fonts';

import { env } from '@/env.mjs';
import { Providers } from '@/app/components/providers/providers';
import { siteConfig } from '@/app/config/site';
import { cn, ensureStartsWith } from '@/app/lib/utils';

interface RootLayoutProps {
  children: React.ReactNode;
}

const { TWITTER_CREATOR, TWITTER_SITE } = env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3001';
const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, '@')
  : undefined;
const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, 'https://')
  : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Exclusive Digital Marketing Community',
    'Digital Marketing Community',
    'Discord Server for Digital Marketers',
    'Digital Marketing Optimization',
    'Rebekah Radice',
  ],
  authors: [
    {
      name: 'Rebekah Radice',
      url: 'https://bril.la',
    },
  ],
  creator: 'Rebekah Radice',
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: '/open-graph.gif',
        width: 1200,
        height: 630,
        alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
      },
    ],
    siteName: siteConfig.name,
  },
  category: 'digital marketing community',
  robots: {
    follow: false,
    index: false,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        title: siteConfig.name,
        description: siteConfig.description,
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite,
        images: [
          {
            url: '/open-graph.gif',
            alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
          },
        ],
      },
    }),
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'apple',
      url: '/icons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      url: '/icons/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'icon',
      url: '/icons/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      url: '/icons/favicon-194x194.png',
      sizes: '194x194',
    },
    {
      rel: 'icon',
      url: '/icons/android-chrome-192x192.png',
      sizes: '194x194',
    },
    {
      rel: 'mask-icon',
      url: '/icons/safari-pinned-tab.svg',
    },
  ],
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#edf1f2' },
    { media: '(prefers-color-scheme: dark)', color: '#010101' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${fontBricolage.variable} text-base antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className={cn('min-h-screen bg-background')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
