import Link from 'next/link';

import { APP_BP } from '#/lib/const';
import { Team } from '#/lib/operations/teams/get-teams';
import { isTeacher } from '#/lib/teacher';
import { MainNavItem } from '#/lib/types';
import { cn } from '#/lib/utils';

import { MainNavigationMenu } from '#/components/layout/main-nav-menu';
import { Icons } from '#/components/shared/icons';
import { TeamSwitcher } from '#/components/teams/team-switcher';
import UserNavSSR from '#/components/teams/user-nav-ssr';
import { buttonVariants } from '#/components/ui/button';

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
  activeTeamSlug?: string;
}

export function NavBar({ user, teams, activeTeamSlug }: NavBarProps) {
  const showAdminLink = isTeacher(user?.id);

  return (
    <header className="sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex flex-1 items-center space-x-3">
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

        <div className="flex flex-1 justify-center">
          <MainNavigationMenu
            teams={teams}
            user={user}
            activeTeamSlug={activeTeamSlug}
          />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-3">
          {showAdminLink && (
            <Link
              href={`${APP_BP}/admin`}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'hidden md:flex',
              )}
            >
              Admin
            </Link>
          )}

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
