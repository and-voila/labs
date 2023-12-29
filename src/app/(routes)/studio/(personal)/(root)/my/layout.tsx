import { APP_BP } from '#/lib/const';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/layout/tabbed-nav';

interface MyWorkspaceRootLayoutProps {
  children: React.ReactNode;
}

const MyWorkspaceRootLayout: React.FC<MyWorkspaceRootLayoutProps> = ({
  children,
}) => {
  return (
    <>
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
    </>
  );
};

export default MyWorkspaceRootLayout;
