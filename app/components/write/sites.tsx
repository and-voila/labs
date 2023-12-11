import { redirect } from 'next/navigation';

import { db } from '#/lib/db';
import { getSession } from '#/lib/session';
import { EmptyPlaceholder } from '#/components/shared/empty-placeholder';
import SiteCard from '#/components/write/site-card';

export default async function Sites({ limit }: { limit?: number }) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  const sites = await db.site.findMany({
    where: {
      user: {
        id: session.user.id as string,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
    cacheStrategy: {
      ttl: 20,
      swr: 10,
    },
    ...(limit ? { take: limit } : {}),
  });

  return sites.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {sites.map((site) => (
        <SiteCard key={site.id} data={site} />
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-start space-x-4">
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="browsers" />
        <EmptyPlaceholder.Title>No Sites Created Yet!</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Your future site is just a few clicks away. Start building your online
          presence and let your ideas take flight.
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    </div>
  );
}
