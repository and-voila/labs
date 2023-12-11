'use client';

import { cloneElement, isValidElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '#/lib/utils';

import { buttonVariants } from '#/components/ui/button';

export interface NavbarLink {
  href: string;
  label: string;
  icon?: React.ReactElement;
  exact?: boolean;
}

interface SidebarProps {
  links: NavbarLink[];
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { links } = props;

  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'fixed left-0 top-0 z-10 flex w-16 flex-col transition-all',
        'mt-16 h-[calc(100%-4rem)] overflow-x-hidden bg-card shadow will-change-auto',
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
                'w-full justify-start',
                (link.exact
                  ? pathname === link.href
                  : pathname.startsWith(link.href)) &&
                  'bg-muted hover:bg-muted',

                // "grid grid-flow-col items-center h-10 rounded-md text-sm font-medium",
                // "hover:bg-gray-100 relative px-3"
              )}
            >
              {link.icon &&
                isValidElement(link.icon) &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cloneElement(link.icon as any, {
                  className: cn('h-4 w-4', 'group-hover:mr-2'),
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
