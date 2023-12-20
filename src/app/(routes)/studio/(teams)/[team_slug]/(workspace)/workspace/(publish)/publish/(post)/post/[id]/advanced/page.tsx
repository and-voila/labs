/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DeletePostForm from ':/src/components/publish/form/delete-post-form';

import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';

import { DashboardHeader } from '#/components/dashboard/header';

export default async function SiteIdAdvanced({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const post = await db.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    cacheStrategy: {
      ttl: 20,
      swr: 10,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Danger zone"
        description="Welcome to the Oops, didn't mean to write that zone. Here lies the delete button, your ticket to a clean slate or a let's pretend that never happened, moment."
      />
      <div className="grid max-w-3xl gap-10">
        <DeletePostForm postName={post?.title!} teamSlug={params.team_slug} />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Delete my Post';
  const description =
    'Experience convenience and control while creating content. Easily delete posts and maintain a clean, organized content space.';

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
