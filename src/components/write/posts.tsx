import { redirect } from 'next/navigation';

import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

import { EmptyPlaceholder } from '#/components/shared/empty-placeholder';
import PostCard from '#/components/write/post-card';

export default async function Posts({
  siteId,
  limit,
}: {
  siteId?: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect('/login');
  }
  const posts = await db.post.findMany({
    where: {
      userId: session.user.id as string,
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {posts.map((post) => (
        <PostCard key={post.id} data={post} />
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
