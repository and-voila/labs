import { redirect } from 'next/navigation';

import SiteCard from '@/app/components/write/site-card';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';

import { EmptyPlaceholder } from '../shared/empty-placeholder';

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
