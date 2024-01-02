'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { APP_BP } from '#/lib/const';
import type { User } from '#/lib/types/next-auth';

import { Icons } from '#/components/shared/icons';
import { AvatarFallback } from '#/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu';
import { UserAvatar } from '#/components/ui/user-avatar';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email' | 'displayName'>;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const handleSignOut = useCallback((event: Event) => {
    event.preventDefault();
    signOut({
      callbackUrl: `${window.location.origin}/`,
    });
  }, []);

  const handleDropdownSelect = useCallback(
    (e: Event) => {
      const mouseEvent = e as unknown as React.MouseEvent<HTMLLIElement>;
      mouseEvent.preventDefault();
      handleSignOut(e);
    },
    [handleSignOut],
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: user?.name || user?.displayName || null,
            image:
              user?.image ||
              `https://avatar.vercel.sh/${user?.name || user?.displayName}`,
            displayName: user?.displayName || null,
          }}
          className="h-8 w-8"
        >
          <AvatarFallback />
        </UserAvatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="text-sm font-medium">{user?.displayName}</p>
            {user?.email && (
              <p className="w-[200px] truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`${APP_BP}/my/workspaces`}
            className="flex items-center space-x-2.5"
          >
            <Icons.dashboard className="h-4 w-4 text-primary" />
            <p className="text-sm">My dashboard</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`${APP_BP}/my/billing`}
            className="flex items-center space-x-2.5"
          >
            <Icons.creditCard className="h-4 w-4 text-primary" />
            <p className="text-sm">Billing</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`${APP_BP}/my/settings`}
            className="flex items-center space-x-2.5"
          >
            <Icons.settings className="h-4 w-4 text-primary" />
            <p className="text-sm">Settings</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={handleDropdownSelect}
        >
          <div className="flex items-center space-x-2.5">
            <Icons.signOut className="h-4 w-4 text-primary" />
            <p className="text-sm">Log out </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
