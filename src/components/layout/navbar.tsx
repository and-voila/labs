'use client';

import Link from 'next/link';

import { CP_PREFIX } from '#/lib/const';
import { isTeacher } from '#/lib/teacher';
import { MainNavItem } from '#/lib/types';
import { cn } from '#/lib/utils';

import { MainNav } from '#/components/layout/main-nav';
import { UserAccountNav } from '#/components/layout/user-account-nav';
import { buttonVariants } from '#/components/ui/button';

import useScroll from '#/hooks/use-scroll';

interface NavBarProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  } | null;
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
  activeTeamSlug?: string;
}

export function NavBar({
  user,
  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);

  const filteredItems = items?.filter((item) => {
    if (item.isLoggedIn && !user) return false;
    return true;
  });

  const showAdminLink = isTeacher(user?.id);

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll
          ? scrolled
            ? 'border-b border-border'
            : 'bg-background/0'
          : 'border-b border-border'
      }`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={filteredItems}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}

          {showAdminLink && (
            <Link
              href={`${CP_PREFIX}/admin`}
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
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
          ) : null}

          {user ? (
            <UserAccountNav user={user} />
          ) : (
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
