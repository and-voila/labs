import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { db } from '#/lib/db';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import SiteCard from '#/components/publish/site-card';
import { EmptyPlaceholder } from '#/components/shared/empty-placeholder';

interface SitesProps {
  teamSlug: string;
  limit?: number;
}

export default async function Sites({ teamSlug, limit }: SitesProps) {
  const team = await getTeam(teamSlug);
  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const sites = await db.site.findMany({
    where: {
      team: {
        id: team.id as string,
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {sites.map((site) => (
        <SiteCard key={site.id} data={site} teamSlug={teamSlug} />
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
