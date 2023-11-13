import { redirect } from 'next/navigation';

import { DashboardNav } from '@/app/components/layout/nav';
import { NavBar } from '@/app/components/layout/navbar';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { playbooksConfig } from '@/app/config/playbooks';
import { authOptions } from '@/app/lib/auth';
import { getCurrentUser } from '@/app/lib/session';

interface PlaybooksLayoutProps {
  children?: React.ReactNode;
}

export default async function PlaybooksLayout({
  children,
}: PlaybooksLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar user={user} items={playbooksConfig.mainNav} scroll={false}>
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
      <SiteFooter className="border-t" />
    </div>
  );
}
