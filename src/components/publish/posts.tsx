import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { db } from '#/lib/db';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import PostCard from '#/components/publish/post-card';
import { EmptyPlaceholder } from '#/components/shared/empty-placeholder';

interface PostsProps {
  siteId?: string;
  limit?: number;
  teamSlug: string;
}

export default async function Posts({ siteId, limit, teamSlug }: PostsProps) {
  const team = await getTeam(teamSlug);
  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const posts = await db.post.findMany({
    where: {
      teamId: team.id as string,
      ...(siteId ? { siteId } : {}),
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      site: true,
    },
    cacheStrategy: {
      ttl: 20,
      swr: 10,
    },
    ...(limit ? { take: limit } : {}),
  });

  return posts.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post) => (
        <PostCard key={post.id} data={post} teamSlug={teamSlug} />
      ))}
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
