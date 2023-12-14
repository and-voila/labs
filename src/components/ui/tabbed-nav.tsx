'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '#/lib/utils';

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

  return (
    <div className="border-b">
      <nav
        className={cn(
          'inline-flex items-center justify-center gap-8 text-muted-foreground',
        )}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'border-b-2 px-1 py-1.5',
              'text-sm font-medium hover:border-foreground hover:text-foreground',
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
