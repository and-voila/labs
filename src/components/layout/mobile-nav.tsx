'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { MainNavItem } from '#/lib/types';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';

import { useLockBody } from '#/hooks/use-lock-body';

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  const pathname = usePathname();
  useLockBody();

  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden',
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md border border-primary bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max border-primary text-sm">
          {items.map((item, index) =>
            item.disabled ? (
              <button
                key={index}
                className={cn(
                  'flex w-full items-center rounded-md p-2 text-sm font-medium text-muted-foreground',
                  'cursor-not-allowed opacity-80',
                )}
                disabled
              >
                {item.title}
              </button>
            ) : (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                  pathname.startsWith(item.href)
                    ? 'font-semibold text-primary underline decoration-4 underline-offset-4'
                    : 'text-muted-foreground',
                )}
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>
        {children}
      </div>
    </div>
  );
}
