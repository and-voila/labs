'use client';

import type { SidebarLink } from '#/lib/types';

import { cloneElement, isValidElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '#/lib/utils';

import { buttonVariants } from '#/components/ui/button';

interface SidebarProps {
  links: SidebarLink[];
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { links } = props;

  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'fixed left-0 top-0 z-30 flex w-16 flex-col bg-background transition-all',
        'mt-16 h-[calc(100%-4rem)] overflow-x-hidden bg-background/60 backdrop-blur-xl will-change-auto',
        'group hover:w-60',
      )}
    >
      <ul className="grid gap-2 pt-3">
        {links.map((link, idx) => (
          <li
            className="grid w-full items-center justify-center group-hover:justify-normal group-hover:px-3"
            key={idx}
          >
            <Link
              href={link.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start hover:bg-primary/20',
                (
                  link.exact
                    ? pathname === link.href
                    : pathname.startsWith(link.href)
                )
                  ? 'bg-primary/20 text-foreground '
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {link.icon &&
                isValidElement(link.icon) &&
                cloneElement(link.icon as React.ReactElement, {
                  className: cn('h-4 w-4 text-primary', 'group-hover:mr-2'),
                })}
              <span
                className={cn(
                  'collapse w-0 truncate',
                  'group-hover:visible group-hover:w-auto',
                )}
              >
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
