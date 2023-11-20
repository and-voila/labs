import { notFound, redirect } from 'next/navigation';

import AnalyticsMockup from '@/app/components/write/analytics';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';

export default async function SiteAnalytics({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  const data = await db.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Analytics for {data.name}
          </h1>
          <a
            href={`https://${url}`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-brand/20 px-2 py-1 text-xs text-brand transition-colors hover:opacity-70"
          >
            {url} ↗
          </a>
        </div>
      </div>
      <AnalyticsMockup />
    </>
  );
}