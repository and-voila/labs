'use client';

import va from '@vercel/analytics';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { buttonVariants } from '#/components/ui/button';
import LoadingDots from '#/components/write/icons/loading-dots';
import { createPost } from '#/lib/actions';
import { cn } from '#/lib/utils';

export default function CreatePostButton() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          const post = await createPost(null, id, null);
          va.track('Created Post');
          router.refresh();
          router.push(`/tools/write/post/${post.id}`);
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
