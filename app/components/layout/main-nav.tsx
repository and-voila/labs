'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MobileNav } from '@/app/components/layout/mobile-nav';
import { Icons } from '@/app/components/shared/icons';
import { siteConfig } from '@/app/config/site';
import { MainNavItem } from '@/app/lib/types';
import { cn } from '@/app/lib/utils';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const closeMobileMenuOnClickOutside = (event: MouseEvent) => {
      if (showMobileMenu) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('click', closeMobileMenuOnClickOutside);

    return () => {
      document.removeEventListener('click', closeMobileMenuOnClickOutside);
    };
  }, [showMobileMenu]);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden text-lg font-extrabold uppercase tracking-tighter sm:inline-block lg:text-xl">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) =>
            item.disabled ? (
              <button
                key={index}
                className={cn(
                  'flex items-center text-lg font-medium text-muted-foreground sm:text-sm',
                  'cursor-not-allowed opacity-80',
                )}
                aria-label={item.title}
                disabled
              >
                {item.title}
              </button>
            ) : (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                  pathname.startsWith(item.href)
                    ? 'font-semibold text-brand underline decoration-4 underline-offset-4'
                    : 'text-muted-foreground',
                )}
                target={item.isExternal ? '_blank' : '_self'}
                rel={item.isExternal ? 'noopener noreferrer' : ''}
                aria-label={item.isExternal ? 'Opens in a new tab' : ''}
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={toggleMobileMenu}
      >
        {showMobileMenu ? <Icons.crossLarge /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
