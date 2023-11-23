'use client';

import { useEffect, useState, useTransition } from 'react';
import { Post } from '@prisma/client';
import { Editor as NovelEditor } from 'novel';
import TextareaAutosize from 'react-textarea-autosize';

import { Icons } from '@/app/components/shared/icons';
import { buttonVariants } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';
import LoadingDots from '@/app/components/write/icons/loading-dots';
import { updatePost, updatePostMetadata } from '@/app/lib/actions';
import { cn } from '@/app/lib/utils';

import { defaultEditorContent } from './default-editor-content';

type PostWithSite = Post & { site: { subdomain: string | null } | null };

export default function Editor({ post }: { post: PostWithSite }) {
  const [isPendingSaving, startTransitionSaving] = useTransition();
  const [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<PostWithSite>(post);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hydrated, setHydrated] = useState(false);
  const [isPublishable, setIsPublishable] = useState(false);

  useEffect(() => {
    setIsPublishable(
      Boolean(
        data.title &&
          data.description &&
          data.image &&
          data.slug &&
          data.content,
      ),
    );
  }, [data]);

  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`
    : `http://${data.site?.subdomain}.localhost:3001/${data.slug}`;

  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 's') {
        e.preventDefault();

        if (!data.title) {
          setTitleError(
            'Please enter a valid title of up to 57 characters. You can change it anytime.',
          );
          return;
        } else {
          setTitleError('');
        }

        if (!data.description) {
          setDescriptionError(
            'Please enter a valid description of up to 159 characters. You can change it anytime.',
          );
          return;
        } else {
          setDescriptionError('');
        }

        if (!data.content) {
          setContentError(
            '👇🏽 Please create some content below before the inital save.',
          );
          return;
        } else {
          setContentError('');
        }

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

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [contentError, setContentError] = useState('');

  return (
    <>
      <div className="my-8 flex flex-col space-y-6">
        <div className="mt-10 border-b border-brand pb-5 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-2xl font-semibold leading-6">
            Editing: {data?.title || 'A new post'}
          </h3>
          <div className="mt-3 flex sm:ml-4 sm:mt-0">
            {data.published && (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Icons.arrowSquareOut className="mr-2 inline-flex h-4 w-4 items-center text-brand" />
              </a>
            )}
            <div
              className={cn(
                'mr-2 inline-flex items-center rounded-lg px-2 py-1 text-sm ',
                isPendingSaving
                  ? 'bg-muted-foreground/20 text-muted-foreground'
                  : (!data.title || !data.description) &&
                      (titleError || descriptionError)
                    ? 'bg-destructive text-white'
                    : 'bg-alternate/20 text-alternate',
              )}
            >
              {isPendingSaving
                ? 'Saving...'
                : (!data.title || !data.description) &&
                    (titleError || descriptionError)
                  ? 'Not saved'
                  : 'Saved'}
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
                      toast({
                        title: `Successfully ${
                          data.published ? 'unpublished' : 'published'
                        } your post.`,
                        description: 'Your post status has been updated.',
                        variant: 'success',
                      });
                      setData((prev) => ({
                        ...prev,
                        published: !prev.published,
                      }));
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
                  'cursor-not-allowed opacity-50':
                    isPendingPublishing || !isPublishable,
                },
              )}
              disabled={isPendingPublishing || !isPublishable}
            >
              {isPendingPublishing ? (
                <LoadingDots />
              ) : (
                <p>{data.published ? 'Unpublish' : 'Publish'}</p>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="relative min-h-[500px] w-full max-w-4xl bg-card px-8 py-12 sm:mb-[calc(20vh)] sm:rounded-lg sm:px-12 sm:shadow-lg">
        <div className="mb-5 flex flex-col space-y-3 border-b border-brand/70 pb-5">
          <input
            type="text"
            placeholder="Your awesome post title of up to 57 characters goes here"
            minLength={10}
            maxLength={57}
            required
            defaultValue={post?.title || ''}
            autoFocus
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="border-none bg-card px-0 font-sans text-2xl font-semibold placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
          />
          {titleError && <p className="text-xs text-red-500">{titleError}</p>}
          <TextareaAutosize
            placeholder="Your super descriptive SEO description goes here. It should include keyword(s) for the post and provide a good summary for search. 157 characters max please."
            minLength={100}
            maxLength={159}
            required
            defaultValue={post?.description || ''}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-[5/6 resize-none border-none bg-card px-0 font-sans placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
          />
          {descriptionError && (
            <p className="text-xs text-red-500">{descriptionError}</p>
          )}
          {contentError && (
            <p className="text-xs text-red-500">{contentError}</p>
          )}
        </div>
        <NovelEditor
          key={post.id}
          storageKey={`novel__content_${post.id}`}
          className="relative block"
          defaultValue={post?.content || defaultEditorContent}
          onUpdate={(editor) => {
            setData((prev) => ({
              ...prev,
              content: editor?.storage.markdown.getMarkdown(),
            }));
          }}
          debounceDuration={3000}
          onDebouncedUpdate={() => {
            if (!data.title) {
              setTitleError(
                'Please enter a valid title of up to 57 characters. You can change it anytime.',
              );
            } else {
              setTitleError('');
            }

            if (!data.description) {
              setDescriptionError(
                'Please enter a valid description of up to 159 characters. You can change it anytime.',
              );
            } else {
              setDescriptionError('');
            }

            if (!data.content) {
              setContentError(
                '👇🏽 Please create some content below before the inital save.',
              );
              return;
            } else {
              setContentError('');
            }

            if (
              data.title === post.title &&
              data.description === post.description &&
              data.content === post.content
            ) {
              return;
            }

            if (data.title && data.description) {
              startTransitionSaving(async () => {
                await updatePost(data);
              });
            }
          }}
        />
      </div>
    </>
  );
}
