import { notFound, redirect } from 'next/navigation';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import CreatePostButton from '@/app/components/write/create-post-button';
import Posts from '@/app/components/write/posts';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';

export default async function SitePosts({
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
    <DashboardShell>
      <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 md:items-start">
        <DashboardHeader
          heading={`Posts for ${data.name}`}
          text={`Draft and perfect your posts for ${data.name}. Our AI tools help beat writer's block and refine your content.`}
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
        <CreatePostButton />
      </div>

      <Posts siteId={decodeURIComponent(params.id)} />
    </DashboardShell>
  );
}
