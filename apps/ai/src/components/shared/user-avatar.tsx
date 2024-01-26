import type { User } from '@prisma/client';
import type { AvatarProps } from '@radix-ui/react-avatar';

import { useMemo } from 'react';
import Image from 'next/image';

import { userColors } from '@av/editor/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@av/ui/avatar';
import { randomElement } from '@av/utils';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name' | 'displayName' | 'id'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const randomColor = useMemo(() => randomElement(userColors), []);
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage
          alt="Picture"
          src={user.image}
          referrerPolicy="no-referrer"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name ?? user.displayName}</span>
          <Image
            src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${user?.id}.svg?backgroundColor=${(
              randomColor ?? 'bg-primary'
            ).replace('#', '')}`}
            alt="The current user's avatar or a fallback image of a Avataaars Neutral"
            width={120}
            height={120}
          />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
