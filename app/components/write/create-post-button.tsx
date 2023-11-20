'use client';

import { useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import va from '@vercel/analytics';

import { buttonVariants } from '@/app/components/ui/button';
import LoadingDots from '@/app/components/write/icons/loading-dots';
import { createPost } from '@/app/lib/actions';
import { cn } from '@/app/lib/utils';

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
      className={cn(buttonVariants({ variant: 'custom', size: 'sm' }), {
        'cursor-not-allowed opacity-50': isPending,
      })}
      disabled={isPending}
    >
      {isPending ? <LoadingDots color="#808080" /> : <p>New Post</p>}
    </button>
  );
}
