'use client';

import { useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import va from '@vercel/analytics';

import { createPost } from '#/lib/actions/publish/publish-actions';
import { APP_BP } from '#/lib/const';
import { cn } from '#/lib/utils';

import LoadingDots from '#/components/publish/icons/loading-dots';
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
      className={cn(buttonVariants({ size: 'sm' }), {
        'cursor-not-allowed opacity-50': isPending,
      })}
      disabled={isPending}
    >
      {isPending ? <LoadingDots color="#808080" /> : <p>New post</p>}
    </button>
  );
}
