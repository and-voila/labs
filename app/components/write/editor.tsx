'use client';

import { useEffect, useState, useTransition } from 'react';
import { Post } from '@prisma/client';
import { Editor as NovelEditor } from 'novel';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'sonner';

import { Icons } from '@/app/components/shared/icons';
import { buttonVariants } from '@/app/components/ui/button';
import LoadingDots from '@/app/components/write/icons/loading-dots';
import { updatePost, updatePostMetadata } from '@/app/lib/actions';
import { cn } from '@/app/lib/utils';

type PostWithSite = Post & { site: { subdomain: string | null } | null };

export default function Editor({ post }: { post: PostWithSite }) {
  const [isPendingSaving, startTransitionSaving] = useTransition();
  const [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<PostWithSite>(post);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hydrated, setHydrated] = useState(false);

  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`
    : `http://${data.site?.subdomain}.localhost:3001/${data.slug}`;

  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 's') {
        e.preventDefault();
        startTransitionSaving(async () => {
          await updatePost(data);
        });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [data, startTransitionSaving]);

  return (
    <div className="relative min-h-[500px] w-full max-w-4xl bg-card px-8 py-12 sm:mb-[calc(20vh)] sm:rounded-lg sm:px-12 sm:shadow-lg">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        {data.published && (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Icons.arrowSquareOut className="h-4 w-4 text-brand" />
          </a>
        )}
        <div
          className={cn(
            'rounded-lg px-2 py-1 text-sm',
            isPendingSaving
              ? 'bg-muted-foreground/20 text-muted-foreground'
              : 'bg-alternate/20 text-alternate',
          )}
        >
          {isPendingSaving ? 'Saving...' : 'Saved'}
        </div>
        <button
          onClick={() => {
            const formData = new FormData();
            // eslint-disable-next-line no-console
            console.log(data.published, typeof data.published);
            formData.append('published', String(!data.published));
            startTransitionPublishing(async () => {
              await updatePostMetadata(formData, post.id, 'published').then(
                () => {
                  toast.success(
                    `Successfully ${
                      data.published ? 'unpublished' : 'published'
                    } your post.`,
                  );
                  setData((prev) => ({ ...prev, published: !prev.published }));
                },
              );
            });
          }}
          className={cn(
            buttonVariants({
              variant: data.published ? 'destructive' : 'custom',
              size: 'sm',
            }),
            {
              'cursor-not-allowed opacity-50': isPendingPublishing,
            },
          )}
          disabled={isPendingPublishing}
        >
          {isPendingPublishing ? (
            <LoadingDots />
          ) : (
            <p>{data.published ? 'Unpublish' : 'Publish'}</p>
          )}
        </button>
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-brand/70 pb-5">
        <input
          type="text"
          placeholder="Title"
          defaultValue={post?.title || ''}
          autoFocus
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="placeholder-text-muted-foreground border-none bg-background px-0 text-3xl font-bold focus:outline-none focus:ring-0"
        />
        <TextareaAutosize
          placeholder="Description"
          defaultValue={post?.description || ''}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="placeholder-text-muted-foreground w-full resize-none border-none bg-background px-0 focus:outline-none focus:ring-0"
        />
      </div>
      <NovelEditor
        className="relative block"
        defaultValue={post?.content || undefined}
        onUpdate={(editor) => {
          setData((prev) => ({
            ...prev,
            content: editor?.storage.markdown.getMarkdown(),
          }));
        }}
        debounceDuration={5000}
        onDebouncedUpdate={() => {
          if (
            data.title === post.title &&
            data.description === post.description &&
            data.content === post.content
          ) {
            return;
          }
          startTransitionSaving(async () => {
            await updatePost(data);
          });
        }}
      />
    </div>
  );
}
