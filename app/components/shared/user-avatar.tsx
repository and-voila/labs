import Image from 'next/image';
import { User } from '@prisma/client';
import { AvatarProps } from '@radix-ui/react-avatar';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name' | 'displayName'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
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
          <span className="sr-only">{user.name || user.displayName}</span>
          <Image
            src={`https://avatar.vercel.sh/${user?.name || user?.displayName}`}
            alt="Vercel Avatar"
            width={120}
            height={120}
          />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
