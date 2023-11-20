import { ReactNode } from 'react';
import { notFound, redirect } from 'next/navigation';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';

import SiteSettingsNav from './nav';

export default async function SiteAnalyticsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
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
    <DashboardShell>
      <div className="flex flex-col items-center justify-between space-x-4 space-y-2 sm:flex-row sm:space-y-0 md:items-start">
        <DashboardHeader
          heading={`Settings for ${data.name}`}
          text={`Customize your site's domain, meta, and visuals. Tailor ${data.name} to your unique style and audience needs.`}
        />

        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.subdomain}.localhost:3001`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-brand/20 px-2 py-1 text-xs text-brand transition-colors hover:opacity-70"
        >
          {url} ↗
        </a>
      </div>
      <SiteSettingsNav />
      {children}
    </DashboardShell>
  );
}
