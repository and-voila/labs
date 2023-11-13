'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/app/components/shared/icons';
import { SidebarNavItem } from '@/app/lib/types';
import { cn } from '@/app/lib/utils';

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
        return (
          item.href && (
            <Link key={index} href={item.disabled ? '/' : item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-brand/20 hover:text-foreground',
                  path === item.href
                    ? 'bg-brand/20 text-foreground'
                    : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80',
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
