import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { APP_BP } from '@and-voila/utils';

import { SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeamMembers } from '#/lib/operations/teams/get-team-members';

import { DashboardHeader } from '#/components/dashboard/header';
import { UpdatePostForm } from '#/components/publish/form/new/update-post-form';

export default async function PostIdMetadata({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const post = await db.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: true,
    },
  });

  if (!post) {
    notFound();
  }

  const teamMembers = await getTeamMembers(params.team_slug);

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Post metadata"
        description="Let AI be your co-pilot in crafting the perfect metadata."
      />
      <div className="my-8 grid gap-8 md:my-12">
        <UpdatePostForm
          post={post}
          teamMembers={teamMembers}
          teamSlug={params.team_slug}
        />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'My Post Metadata';
  const description =
    'Manage your post metadata with ease. Our fine-tuned, task-specific AI is here to help. Spend less time on the details and more on creating impactful content.';

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
