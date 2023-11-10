'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Icons } from '@/app/components/shared/icons';
import { SidebarItemProps } from '@/app/lib/types';
import { cn } from '@/app/lib/utils';

export const SidebarItem = ({ icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href || pathname === `${href}/`;

  const onClick = () => {
    router.push(href);
  };

  const IconComponent = Icons[icon];

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-center gap-x-2 pl-6 text-sm font-semibold text-muted-foreground transition-all hover:bg-gray-400/20 hover:text-foreground',
        isActive &&
          'bg-brand/20 text-foreground hover:bg-brand/20 hover:text-foreground',
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <IconComponent
          className={cn(
            'h-5 w-5 text-muted-foreground',
            isActive && 'text-brand',
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto h-full border-2 border-brand opacity-0 transition-all',
          isActive && 'opacity-100',
        )}
      />
    </button>
  );
};