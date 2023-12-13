'use client';

import * as React from 'react';
import Link from 'next/link';

import { CP_PREFIX } from '#/lib/const';
import { MainNavItem } from '#/lib/types';

import { MobileNav } from '#/components/layout/mobile-nav';
import { MainNavigationMenu } from '#/components/layout/nav-menu';
import { Logo } from '#/components/logo-square';
import { Icons } from '#/components/shared/icons';
import { Separator } from '#/components/ui/separator';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
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
    <div className="left-0 flex w-screen items-center justify-between gap-5">
      <div className="hidden grid-flow-col items-center gap-4 space-x-2 md:flex">
        <Link href={`${CP_PREFIX}`}>
          <Logo fillOnHover className="h-8" />
        </Link>
        <Separator orientation="vertical" />
      </div>
      <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
        <MainNavigationMenu />
      </div>
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
