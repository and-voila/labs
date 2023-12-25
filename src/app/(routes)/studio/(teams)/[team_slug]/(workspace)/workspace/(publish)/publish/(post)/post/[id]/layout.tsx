import { APP_BP } from '#/lib/const';
import { db } from '#/lib/db';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/layout/tabbed-nav';

interface PostIdLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
    id: string;
  };
}

export default async function PostIdLayout({
  children,
  params,
}: PostIdLayoutProps) {
  const post = await db.post.findUnique({
    where: {
      id: params.id,
    },
  });
  const siteId = post?.siteId;

  const links = [
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/site/${siteId}`,
      label: 'Posts',
      exact: true,
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/post/${params.id}`,
      label: 'Compose',
      exact: true,
    },

    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/post/${params.id}/metadata`,
      label: 'Metadata',
      exact: true,
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/post/${params.id}/advanced`,
      label: 'Advanced',
    },
  ];

  return (
    <DashboardShell>
      <div>
        <TabbedNav links={links} />
      </div>
      <div>{children}</div>
    </DashboardShell>
  );
}