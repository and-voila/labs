import { redirect } from 'next/navigation';

import { playbooksConfig } from '#/config/playbooks';

import { authOptions } from '#/lib/auth';
import { getSession } from '#/lib/session';

import { DashboardNav } from '#/components/layout/nav';
import { NavBar } from '#/components/layout/navbar';
import { SiteFooter } from '#/components/layout/site-footer';

interface PlaybooksLayoutProps {
  children?: React.ReactNode;
}

export default async function PlaybooksLayout({
  children,
}: PlaybooksLayoutProps) {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const user = session.user;

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar user={user} scroll={false}>
        <DashboardNav items={playbooksConfig.sidebarNav} />
      </NavBar>

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={playbooksConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}