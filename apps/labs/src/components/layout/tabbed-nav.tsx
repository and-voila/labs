'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@and-voila/ui';

import { APP_BP } from '#/lib/const';

export interface NavbarLink {
  href: string;
  label: string;
  icon?: React.ReactElement;
  exact?: boolean;
}

export const TabbedNav: React.FC<{
  links: NavbarLink[];
}> = ({ links }) => {
  const pathname = usePathname();

  if (!pathname.includes(APP_BP)) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <nav
        className={cn(
          'inline-flex flex-wrap items-center justify-center gap-6 text-muted-foreground',
        )}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'border-b-2 p-1',
              'text-sm font-medium hover:border-primary hover:text-foreground',
              'inline-flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              (
                link.exact
                  ? pathname === link.href
                  : pathname.startsWith(link.href)
              )
                ? 'border-primary bg-background text-foreground shadow-sm'
                : 'border-transparent',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
