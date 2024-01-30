import type { Team } from '#/lib/operations/teams/get-teams';
import type { MainNavItem } from '#/lib/types';

import Link from 'next/link';

import { cn } from '@av/ui';
import { buttonVariants } from '@av/ui/button';
import { Icons } from '@av/ui/icons';
import { APP_BP } from '@av/utils';

import { MainNavigationMenu } from '#/components/layout/main-nav-menu';
import { TeamSwitcher } from '#/components/teams/team-switcher';
import UserNavSSR from '#/components/teams/user-nav-ssr';

interface NavBarProps {
  teams?: Team[];
  user?: {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
    displayName: string;
  } | null;
  items?: MainNavItem[];
  children?: React.ReactNode;
  activeTeamSlug?: string | null | undefined;
}

export function NavBar({ user, teams, activeTeamSlug }: NavBarProps) {
  return (
    <header className="fixed top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all">
      <div className="flex h-16 w-screen items-center justify-between px-4">
        <div className="flex flex-1 items-center space-x-10">
          {user ? (
            <Link href={`${APP_BP}/my/workspaces`}>
              <Icons.logo className="h-8 w-8 text-primary" />
            </Link>
          ) : (
            <Link href="/">
              <Icons.logo className="h-8 w-8 text-primary" />
            </Link>
          )}
          {user && (
            <TeamSwitcher
              user={user}
              teams={teams}
              activeTeamSlug={activeTeamSlug}
            />
          )}
        </div>

        <div className="hidden justify-center lg:flex lg:flex-1">
          <MainNavigationMenu
            teams={teams}
            user={user}
            activeTeamSlug={activeTeamSlug}
          />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-3">
          {!user ? (
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Login
            </Link>
          ) : (
            <UserNavSSR />
          )}

          {!user && (
            <Link
              href="/register"
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
