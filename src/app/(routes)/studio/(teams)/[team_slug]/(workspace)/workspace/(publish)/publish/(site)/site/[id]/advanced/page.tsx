/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';

import { DashboardHeader } from '#/components/dashboard/header';
import DeleteSiteForm from '#/components/publish/form/delete-site-form';

export default async function SiteIdAdvanced({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const site = await db.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    cacheStrategy: {
      ttl: 20,
      swr: 10,
    },
  });

  if (!site) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title={`Danger Zone for ${site?.name}`}
        description="Here be dragons... and the delete button. Tread carefully, for this is where sites come to an end, or get a fresh start."
      />
      <div className="grid max-w-3xl gap-10">
        <DeleteSiteForm siteName={site?.name!} teamSlug={params.team_slug} />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = "My Site's Advanced Settings";
  const description =
    'Tweak your site to perfection with Advanced Settings. Fine-tune features, optimize performance, and dressen up your online presence.';

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/workspace/publish/sites`;

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
