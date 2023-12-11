'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarNavItem } from '#/lib/types';
import { cn } from '#/lib/utils';
import { Icons } from '#/components/shared/icons';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || 'arrowSquareOut'];
        return item.disabled ? (
          <button
            key={index}
            className={cn(
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground',
              'cursor-not-allowed opacity-80',
            )}
            disabled
          >
            <Icon className="mr-1 h-4 w-4" />
            <span>{item.title}</span>
          </button>
        ) : (
          <Link key={index} href={item.href || '/'}>
            <span
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/20 hover:text-foreground',
                path === item.href
                  ? 'bg-primary/20 text-foreground'
                  : 'transparent',
              )}
            >
              <Icon className="mr-1 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
