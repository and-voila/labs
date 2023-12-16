import { Suspense } from 'react';
import { Metadata } from 'next';

import { APP_BP } from '#/lib/const';

import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import CreateSiteButton from '#/components/write/create-site-button';
import CreateSiteModal from '#/components/write/modal/create-site';
import PlaceholderCard from '#/components/write/placeholder-card';
import Sites from '#/components/write/sites';

export default function AllSites({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 md:items-start">
        <DashboardHeader
          heading="My sites"
          text="Express, connect, and grow your brand. Set up your blog quickly with custom domains and AI-driven writing support."
        />
        <CreateSiteButton>
          <CreateSiteModal />
        </CreateSiteButton>
      </div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <PlaceholderCard key={i} />
            ))}
          </div>
        }
      >
        {/* @ts-expect-error Server Component */}
        <Sites siteId={decodeURIComponent(params.id)} />
      </Suspense>
    </DashboardShell>
  );
}

export function generateMetadata(): Metadata {
  const title = 'My Sites';
  const description =
    'Launch your digital presence with And Voila. Build and customize your site, add a domain, and go live in under 3 minutes. Your platform, your rules.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}${APP_BP}/tools/write/sites`;

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
