import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { APP_BP } from '#/lib/const';
import { getSession } from '#/lib/operations/user/session';
import { isTeacher } from '#/lib/teacher';

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
    redirect(authOptions?.pages?.signIn || '/login');
  } else if (!isTeacher(session.user.id)) {
    redirect('/not-authorized');
  }
  return (
    <>
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
    </>
  );
};

export default AdminRootLayout;
