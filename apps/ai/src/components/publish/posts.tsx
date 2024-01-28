import React from 'react';
import { redirect } from 'next/navigation';

import { ScrollArea, ScrollBar } from '@av/ui/scroll-area';

import { authOptions } from '#/lib/auth';
import { db } from '#/lib/db';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import PostCard from '#/components/publish/post-card';
import { EmptyPlaceholder } from '#/components/shared/empty-placeholder';

interface PostsProps {
  siteId?: string;
  limit?: number;
  teamSlug: string;
  published?: boolean;
}

export default async function Posts({
  siteId,
  limit,
  teamSlug,
  published,
}: PostsProps) {
  const team = await getTeam(teamSlug);
  if (!team) {
    redirect(authOptions?.pages?.signIn ?? '/login');
  }

  const posts = await db.post.findMany({
    where: {
      teamId: team.id,
      ...(siteId ? { siteId } : {}),
      ...(published !== undefined ? { published } : {}),
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      site: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return posts.length > 0 ? (
    <div className="relative">
      <ScrollArea className="max-w-7xl whitespace-nowrap rounded-md border">
        <div className="flex space-x-4 pb-4">
          {posts.map((post) => (
            <PostCard key={post.id} data={post} teamSlug={teamSlug} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ) : (
    <div className="flex flex-col items-start space-x-4">
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="file" />
        <EmptyPlaceholder.Title>No Posts Created Yet!</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Your audience awaits your wisdom. Share your thoughts, insights, or
          stories. Begin your blogging journey now!
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    </div>
  );
}
