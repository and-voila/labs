import { APP_BP } from '@av/utils';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/layout/tabbed-nav';

interface PublishLayoutProps {
  children: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function PublishLayout({
  children,
  params,
}: PublishLayoutProps) {
  const links = [
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish`,
      label: 'Publish',
      exact: true,
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/sites`,
      label: 'Sites',
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/posts`,
      label: 'Posts',
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/plan`,
      label: 'Plan',
    },
    {
      href: `${APP_BP}/${params.team_slug}/workspace/publish/improve`,
      label: 'Improve',
    },
  ];

  return (
    <div className="w-full max-w-7xl px-8 pb-16 pt-4">
      <TabbedNav links={links} />
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
