'use client';

import type { User } from '@prisma/client';

import { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { AvatarFallback } from '@av/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@av/ui/dropdown-menu';
import { Icons } from '@av/ui/icons';
import { APP_BP, randomElement } from '@av/utils';

import { userColors } from '#/lib/tiptap/constants';

import { UserAvatar } from '../shared/user-avatar';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email' | 'displayName' | 'id'>;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const handleSignOut = useCallback((event: Event) => {
    event.preventDefault();
    void signOut({
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

  const randomColor = useMemo(() => randomElement(userColors), []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            id: user?.id,
            name: user?.name ?? user?.displayName ?? null,
            image:
              user?.image ??
              `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${user?.displayName}.svg?backgroundColor=${(
                randomColor ?? 'bg-primary'
              ).replace('#', '')}`,
            displayName: user?.name ?? user?.displayName ?? null,
          }}
          className="h-8 w-8"
        >
          <AvatarFallback />
        </UserAvatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="text-sm font-medium text-alternate">
              {user?.name ?? user?.displayName}
            </p>
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
