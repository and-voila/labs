import { APP_BP } from '@av/utils';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/layout/tabbed-nav';

interface SiteIdLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
    id: string;
  };
}

export default async function SiteIdLayout({
  children,
  params,
}: SiteIdLayoutProps) {
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
    <div className="h-full w-full max-w-7xl px-8 pb-16 pt-4">
      <TabbedNav links={links} />
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
