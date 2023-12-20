import Link from 'next/link';
import { notFound } from 'next/navigation';

import { APP_BP } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import CreateSiteButton from '#/components/publish/create-site-button';
import CreateSiteModal from '#/components/publish/modal/create-site';
import { Button } from '#/components/ui/button';

interface OverviewSitesCTAProps {
  teamSlug: string;
}

export default async function OverviewSitesCTA({
  teamSlug,
}: OverviewSitesCTAProps) {
  const team = await getTeam(teamSlug);
  if (!team) {
    notFound();
  }
  const sites = await db.site.count({
    where: {
      teamId: team.id as string,
    },
    cacheStrategy: {
      ttl: 90,
      swr: 30,
    },
  });

  return sites > 0 ? (
    <Link href={`${APP_BP}/${teamSlug}/workspace/publish/sites`}>
      <Button variant="outline" size="sm" className="mx-2">
        All sites
      </Button>
    </Link>
  ) : (
    <CreateSiteButton>
      <CreateSiteModal teamSlug={teamSlug} />
    </CreateSiteButton>
  );
}
