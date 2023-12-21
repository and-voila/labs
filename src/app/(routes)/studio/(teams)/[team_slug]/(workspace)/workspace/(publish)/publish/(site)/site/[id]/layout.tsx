import { Site } from '@prisma/client';

import { APP_BP } from '#/lib/const';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/layout/tabbed-nav';

interface PublishLayoutProps {
  children: React.ReactNode;
  data: Site;
  params: {
    team_slug: string;
    id: string;
  };
}

export default async function SiteIdLayout({
  children,
  params,
}: PublishLayoutProps) {
  const links = [
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/site/${params.id}`,
      label: 'Manage',
      exact: true,
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/site/${params.id}/settings`,
      label: 'Settings',
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/site/${params.id}/domains`,
      label: 'Domains',
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/site/${params.id}/appearance`,
      label: 'Appearance',
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/site/${params.id}/advanced`,
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
