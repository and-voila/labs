import Link from 'next/link';
import { redirect } from 'next/navigation';

import BlurImage from '@/app/components/write/blur-image';
import LogoutButton from '@/app/components/write/logout-button';
import { getSession } from '@/app/lib/session';
import { placeholderBlurhash } from '@/app/lib/utils';

export default async function Profile() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/settings"
        className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        <BlurImage
          src={
            session.user.image ??
            `https://avatar.vercel.sh/${session.user.email}`
          }
          width={40}
          height={40}
          alt={session.user.name ?? 'User avatar'}
          className="h-6 w-6 rounded-full"
          placeholder="blur"
          blurDataURL={placeholderBlurhash}
        />
        <span className="truncate text-sm font-medium">
          {session.user.name}
        </span>
      </Link>
      <LogoutButton />
    </div>
  );
}
