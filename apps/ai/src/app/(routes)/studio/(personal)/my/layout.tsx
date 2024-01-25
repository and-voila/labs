import { APP_BP } from '@and-voila/utils';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/layout/tabbed-nav';

interface MyWorkspaceRootLayoutProps {
  children: React.ReactNode;
}

const MyWorkspaceRootLayout: React.FC<MyWorkspaceRootLayoutProps> = ({
  children,
}) => {
  return (
    <div className="w-full max-w-7xl px-8 pb-16 pt-4">
      <TabbedNav
        links={[
          {
            label: 'Workspaces',
            href: `${APP_BP}/my/workspaces`,
          },
          {
            href: `${APP_BP}/my/settings`,
            label: 'Settings',
          },
          {
            label: 'Billing',
            href: `${APP_BP}/my/billing`,
          },
          {
            label: 'Support',
            href: `${APP_BP}/my/support`,
          },
          {
            label: 'Advanced',
            href: `${APP_BP}/my/advanced`,
          },
        ]}
      />
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
};

export default MyWorkspaceRootLayout;
