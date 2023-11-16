'use client';

import Link from 'next/link';

import { buttonVariants } from '@/app/components/ui/button';
import useScroll from '@/app/hooks/use-scroll';
import { isTeacher } from '@/app/lib/teacher';
import { MainNavItem } from '@/app/lib/types';
import { cn } from '@/app/lib/utils';

import { MainNav } from './main-nav';
import { UserAccountNav } from './user-account-nav';

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
    if (item.isTeacher && !isTeacher(user?.id)) return false;
    return true;
  });

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? 'border-b' : 'bg-background/0') : 'border-b'
      }`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={filteredItems}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}

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
              className={cn(buttonVariants({ variant: 'custom', size: 'sm' }))}
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
