import type { Metadata } from 'next';

import Link from 'next/link';

import { cn } from '@av/ui';
import { buttonVariants } from '@av/ui/button';
import { Icons } from '@av/ui/icons';
import { APP_BP } from '@av/utils';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';

const NotAuthorizedPage = () => {
  return (
    <main className="relative isolate min-h-full min-w-full">
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Not Authorized
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          A little bit Alexis
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base sm:mt-6 lg:text-lg">
          Looks like you&apos;ve taken a wrong turn on the way to Café Tropical.
          A mistake you say? Contact Stevie at the front desk for assistance.
          Just don&apos;t ask for a wake-up call.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href={`${APP_BP}/my/workspaces`}
            className={cn(buttonVariants())}
          >
            <Icons.caretLeft className="mr-2 h-4 w-4" />
            Get me out of here!
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotAuthorizedPage;

export function generateMetadata(): Metadata {
  const title = 'Not Authorized';
  const description = `Looks like you've taken a wrong turn into the Rose family's exclusive space. This area is for ${siteConfig.name} admins and mods. Please return to more familiar grounds.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}/not-authorized`;

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: pageUrl,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };

  return metadata;
}
