import { redirect } from 'next/navigation';

import { ScrollArea } from '@av/ui/scroll-area';
import { ScrollBar } from '@av/ui/scroll-bar';

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
    redirect(authOptions?.pages?.signIn ?? '/login');
  }

  const sites = await db.site.findMany({
    where: {
      team: {
        id: team.id,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
    ...(limit ? { take: limit } : {}),
  });

  return sites.length > 0 ? (
    <div className="relative">
      <ScrollArea className="max-w-7xl whitespace-nowrap rounded-md border">
        <div className="flex space-x-4 pb-4">
          {sites.map((site) => (
            <SiteCard key={site.id} data={site} teamSlug={teamSlug} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
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
