/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeams } from '#/lib/operations/teams/get-teams';

import Document from '#/components/tiptap/document';

export default async function PostIdPage({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const { user, teams } = await getTeams();
  const team = teams.find((team) => team.slug === params.team_slug);
  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const post = await db.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          subdomain: true,
          id: true,
        },
      },
    },
  });
  if (!post || !post.site?.id || post.teamId !== team.id) {
    notFound();
  }

  const postId = params.id;
  const siteId = post?.site?.id;
  const teamId = team.id;

  return (
    <Document
      postId={postId}
      siteId={siteId}
      user={user}
      teamId={teamId}
      teamSlug={params.team_slug}
    />
  );
}

export function generateMetadata(): Metadata {
  const title = 'AI Editor';
  const description = `Draft content with ${siteConfig.name} Edit Post. Embrace a Notion-inspired, AI-powered editor built on Novel.sh for seamless creation and editing that feels like magic.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/workspace/publish`;

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
