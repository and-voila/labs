import { redirect } from 'next/navigation';

import { DashboardNav } from '@/app/components/layout/nav';
import { NavBar } from '@/app/components/layout/navbar';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { teacherConfig } from '@/app/config/teacher';
import { authOptions } from '@/app/lib/auth';
import { getSession } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

interface TeacherLayoutProps {
  children?: React.ReactNode;
}

export default async function TeacherLayout({ children }: TeacherLayoutProps) {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  } else if (!isTeacher(session.user.id)) {
    redirect('/not-authorized');
  }

  const user = session.user;

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar user={user} items={teacherConfig.mainNav} scroll={false}>
        <DashboardNav items={teacherConfig.sidebarNav} />
      </NavBar>

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={teacherConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
