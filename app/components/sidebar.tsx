import { redirect } from 'next/navigation';

import { FreeCounter } from '@/app/components/free-counter';
import { Logo } from '@/app/components/logo-square';
import { SidebarProps } from '@/app/lib/types';

import { SidebarRoutes } from '../config/sidebar-routes';
import { authOptions } from '../lib/auth';
import { getCurrentUser } from '../lib/session';

export const Sidebar = async ({
  apiLimitCount,
  isPaidMember = false,
}: SidebarProps) => {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) {
    redirect(authOptions?.pages?.signIn || '/login');
  }
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[#d0d5dd] shadow-sm dark:bg-[#010101]">
      <div className="flex items-center p-6">
        <Logo fillOnHover className="h-6 md:h-8" />
        <sup className="-ml-2 font-mono text-xs text-brand md:-ml-3">beta</sup>
      </div>
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
      <div className="absolute bottom-6 flex w-full flex-col">
        <FreeCounter
          isPaidMember={isPaidMember}
          apiLimitCount={apiLimitCount}
          userId={userId}
        />
      </div>
    </div>
  );
};
