'use client';

import { useCallback, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import va from '@vercel/analytics';

import { createPost } from '#/lib/actions/publish/publish-actions';
import { APP_BP } from '#/lib/const';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';

export default function CreatePostButton() {
  const router = useRouter();
  const { id, team_slug: teamSlug } = useParams() as {
    id: string;
    team_slug: string;
  };
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(() => {
    startTransition(async () => {
      const post = await createPost(null, id, teamSlug);
      va.track('Created Post');
      router.refresh();
      router.push(`${APP_BP}/${teamSlug}/workspace/publish/post/${post.id}`);
    });
  }, [startTransition, id, teamSlug, router]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        buttonVariants({ size: 'sm' }),
        'mt-6 w-full md:mt-0 md:w-auto',
        {
          'cursor-not-allowed opacity-50': isPending,
        },
      )}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Just a sec
        </>
      ) : (
        <>New post</>
      )}
    </button>
  );
}
