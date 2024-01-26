import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { APP_BP } from '@av/utils';

import { SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';

import { DashboardHeader } from '#/components/dashboard/header';
import NewDeletePostForm from '#/components/publish/form/new/new-delete-post-form';

export default async function PostIdAdvanced({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const post = await db.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Danger zone"
        description="Welcome to the Oops, didn't mean to write that zone."
      />
      <div className="my-8 grid max-w-3xl gap-8 md:my-12">
        <NewDeletePostForm postName={post?.title} teamSlug={params.team_slug} />
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
