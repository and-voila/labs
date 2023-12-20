'use client';

import { useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import va from '@vercel/analytics';

import { createPost } from '#/lib/actions/publish/publish-actions';
import { APP_BP } from '#/lib/const';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';

export default function CreatePostButton() {
  const router = useRouter();
  const { id, team_slug } = useParams() as { id: string; team_slug: string };
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          const post = await createPost(null, id, team_slug);
          va.track('Created Post');
          router.refresh();
          // eslint-disable-next-line camelcase
          router.push(
            // eslint-disable-next-line camelcase
            `${APP_BP}/${team_slug}/workspace/publish/post/${post.id}`,
          );
        })
      }
      className={cn(
        buttonVariants({ size: 'lg' }),
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
        <>
          <Icons.plusCircled className="mr-2 h-4 w-4" /> New post
        </>
      )}
    </button>
  );
}
