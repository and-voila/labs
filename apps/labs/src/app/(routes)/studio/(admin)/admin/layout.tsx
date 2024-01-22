import { redirect } from 'next/navigation';

import { isAdmin } from '#/lib/admin';
import { authOptions } from '#/lib/auth';
import { APP_BP } from '#/lib/const';
import { getSession } from '#/lib/operations/user/session';

import { DashboardShell } from '#/components/dashboard/shell';
import { TabbedNav } from '#/components/layout/tabbed-nav';

interface AdminRootLayoutProps {
  children: React.ReactNode;
}

const AdminRootLayout: React.FC<AdminRootLayoutProps> = async ({
  children,
}) => {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn ?? '/login');
  }
  const isAdminUser = await isAdmin(session.user.id);
  if (!isAdminUser) {
    redirect('/not-authorized');
  }
  return (
    <div className="w-full max-w-7xl px-8 pb-16 pt-4">
      <TabbedNav
        links={[
          {
            label: 'Home',
            href: `${APP_BP}/admin`,
            exact: true,
          },
          {
            href: `${APP_BP}/admin/teacher/`,
            label: 'Playbooks',
          },
        ]}
      />
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
};

export default AdminRootLayout;
