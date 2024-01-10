/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeamMembers } from '#/lib/operations/teams/get-team-members';

import { DashboardHeader } from '#/components/dashboard/header';
import { PublishPostForm } from '#/components/publish/form/publish-post-form';

export default async function PostIdPublish({
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
    cacheStrategy: {
      ttl: 20,
      swr: 10,
    },
  });

  if (!post) {
    notFound();
  }

  const teamMembers = await getTeamMembers(params.team_slug);

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Publish post"
        description="Review your post and publish it to your site."
      />
      <div className="my-8 grid gap-8 md:my-12">
        <PublishPostForm
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
