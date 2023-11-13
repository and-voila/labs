import { redirect } from 'next/navigation';

import { DashboardNav } from '@/app/components/layout/nav';
import { NavBar } from '@/app/components/layout/navbar';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { adminConfig } from '@/app/config/admin';
import { getCurrentUser } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!isTeacher(userId)) {
    return redirect('/not-authorized');
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar user={user} items={adminConfig.mainNav} scroll={false}>
        <DashboardNav items={adminConfig.sidebarNav} />
      </NavBar>

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={adminConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
