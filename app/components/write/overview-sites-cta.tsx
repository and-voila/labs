import Link from 'next/link';

import CreateSiteButton from '@/app/components/write/create-site-button';
import CreateSiteModal from '@/app/components/write/modal/create-site';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';

import { Button } from '../ui/button';

export default async function OverviewSitesCTA() {
  const session = await getSession();
  if (!session) {
    return 0;
  }
  const sites = await db.site.count({
    where: {
      userId: session.user.id as string,
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
