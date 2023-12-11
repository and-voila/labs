import Link from 'next/link';

import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

import { Button } from '#/components/ui/button';
import CreateSiteButton from '#/components/write/create-site-button';
import CreateSiteModal from '#/components/write/modal/create-site';

export default async function OverviewSitesCTA() {
  const session = await getSession();
  if (!session) {
    return 0;
  }
  const sites = await db.site.count({
    where: {
      userId: session.user.id as string,
    },
    cacheStrategy: {
      ttl: 90,
      swr: 30,
    },
  });

  return sites > 0 ? (
    <Link href="/tools/write/sites">
      <Button variant="outline" size="sm" className="mx-2">
        All sites
      </Button>
    </Link>
  ) : (
    <CreateSiteButton>
      <CreateSiteModal />
    </CreateSiteButton>
  );
}
