'use client';

import * as React from 'react';
import Link from 'next/link';

import { CP_PREFIX } from '#/lib/const';
import { Team } from '#/lib/team/get-teams';
import { MainNavItem } from '#/lib/types';

import { MobileNav } from '#/components/layout/mobile-nav';
import { MainNavigationMenu } from '#/components/layout/nav-menu';
import { Icons } from '#/components/shared/icons';
import { TeamSwitcher } from '#/components/teams/team-switcher';
import { Separator } from '#/components/ui/separator';

interface MainNavProps {
  user?: {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
    displayName: string;
  } | null;
  teams?: Team[];
  activeTeamSlug?: string;
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({
  user,
  teams,
  activeTeamSlug,
  items,
  children,
}: MainNavProps) {
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
          <Icons.logo className="h-8 w-8 text-primary" />
        </Link>
        <Separator orientation="vertical" />
        {user && (
          <TeamSwitcher
            user={user}
            teams={teams}
            activeTeamSlug={activeTeamSlug}
          />
        )}
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
