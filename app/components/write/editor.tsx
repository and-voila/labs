'use client';

import { useEffect, useReducer, useState, useTransition } from 'react';
import { Post } from '@prisma/client';
import { Editor as NovelEditor } from 'novel';

import { Icons } from '@/app/components/shared/icons';
import { buttonVariants } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';
import { defaultEditorContent } from '@/app/components/write/default-editor-content';
import LoadingDots from '@/app/components/write/icons/loading-dots';
import { updatePost, updatePostMetadata } from '@/app/lib/actions';
import { cn } from '@/app/lib/utils';

import PostDescriptionInput from './editor/post-description-input';
import PostTitleInput from './editor/post-title-input';

type PostWithSite = Post & { site: { subdomain: string | null } | null };

interface EditorState {
  data: PostWithSite;
  titleError: string;
  descriptionError: string;
  contentError: string;
}

type EditorAction =
  | { type: 'setData'; payload: PostWithSite }
  | { type: 'setTitleError'; payload: string }
  | { type: 'setDescriptionError'; payload: string }
  | { type: 'setContentError'; payload: string };

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'setData':
      return { ...state, data: action.payload };
    case 'setTitleError':
      return { ...state, titleError: action.payload };
    case 'setDescriptionError':
      return { ...state, descriptionError: action.payload };
    case 'setContentError':
      return { ...state, contentError: action.payload };
    default:
      return state;
  }
}

function validateTitle(title: string): string {
  return title
    ? ''
    : 'Please enter a valid title of up to 57 characters. You can change it anytime.';
}

function validateDescription(description: string): string {
  return description
    ? ''
    : 'Please enter a valid description of up to 159 characters. You can change it anytime.';
}

function validateContent(content: string): string {
  return content
    ? ''
    : '👇🏽 Please create some content below before the auto-save.';
}

export default function Editor({ post }: { post: PostWithSite }) {
  const [isPendingSaving, startTransitionSaving] = useTransition();
  const [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [isPublishable, setIsPublishable] = useState(false);
  const [state, dispatch] = useReducer(editorReducer, {
    data: post,
    titleError: '',
    descriptionError: '',
    contentError: '',
  });

  useEffect(() => {
    setIsPublishable(
      Boolean(
        state.data.title &&
          state.data.description &&
          state.data.image &&
          state.data.slug &&
          state.data.content,
      ),
    );
  }, [state.data]);

  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${state.data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${state.data.slug}`
    : `http://${state.data.site?.subdomain}.localhost:3001/${state.data.slug}`;

  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 's') {
        e.preventDefault();

        dispatch({
          type: 'setTitleError',
          payload: validateTitle(state.data.title || ''),
        });
        if (!state.data.title) return;

        dispatch({
          type: 'setDescriptionError',
          payload: validateDescription(state.data.description || ''),
        });
        if (!state.data.description) return;

        dispatch({
          type: 'setContentError',
          payload: validateContent(state.data.content || ''),
        });
        if (!state.data.content) return;

        startTransitionSaving(async () => {
          await updatePost(state.data);
        });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [state.data, startTransitionSaving]);

  return (
    <>
      <div className="my-8 flex flex-col space-y-6">
        <div className="mt-10 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-2xl font-semibold leading-6">
            Editing: {state.data?.title || 'A new post'}
          </h3>
          <div className="mt-3 flex sm:ml-4 sm:mt-0">
            {state.data.published && (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Icons.arrowSquareOut className="mr-2 inline-flex h-4 w-4 items-center text-primary" />
              </a>
            )}
            <div
              className={cn(
                'mr-2 inline-flex items-center rounded-lg px-2 py-1 text-sm ',
                isPendingSaving
                  ? 'bg-muted-foreground/20 text-muted-foreground'
                  : (!state.data.title || !state.data.description) &&
                      (state.titleError || state.descriptionError)
                    ? 'bg-destructive text-white'
                    : 'bg-alternate/20 text-alternate',
              )}
            >
              {isPendingSaving
                ? 'Saving...'
                : (!state.data.title || !state.data.description) &&
                    (state.titleError || state.descriptionError)
                  ? 'Not saved'
                  : 'Saved'}
            </div>
            <button
              onClick={() => {
                const formData = new FormData();
                // eslint-disable-next-line no-console
                console.log(state.data.published, typeof state.data.published);
                formData.append('published', String(!state.data.published));
                startTransitionPublishing(async () => {
                  await updatePostMetadata(formData, post.id, 'published').then(
                    () => {
                      toast({
                        title: `Successfully ${
                          state.data.published ? 'unpublished' : 'published'
                        } your post.`,
                        description: 'Your post status has been updated.',
                        variant: 'success',
                      });
                      dispatch({
                        type: 'setData',
                        payload: {
                          ...state.data,
                          published: !state.data.published,
                        },
                      });
                    },
                  );
                });
              }}
              className={cn(
                buttonVariants({
                  variant: state.data.published ? 'destructive' : 'default',
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
                <p>{state.data.published ? 'Unpublish' : 'Publish'}</p>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="relative min-h-[500px] w-full max-w-4xl bg-card px-8 py-12 sm:mb-[calc(20vh)] sm:rounded-lg sm:px-12 sm:shadow-lg">
        <div className="mb-5 flex flex-col space-y-3 border-b border-primary/70 pb-5">
          <PostTitleInput
            value={state.data.title || ''}
            onChange={(newTitle) =>
              dispatch({
                type: 'setData',
                payload: { ...state.data, title: newTitle },
              })
            }
          />
          {state.titleError && (
            <p className="text-xs text-red-500">{state.titleError}</p>
          )}
          <PostDescriptionInput
            value={state.data.description || ''}
            onChange={(newDescription) =>
              dispatch({
                type: 'setData',
                payload: { ...state.data, description: newDescription },
              })
            }
          />
          {state.descriptionError && (
            <p className="text-xs text-red-500">{state.descriptionError}</p>
          )}
          {state.contentError && (
            <p className="text-xs text-red-500">{state.contentError}</p>
          )}
        </div>
        <NovelEditor
          key={post.id}
          storageKey={`novel__content_${post.id}`}
          className="relative block"
          defaultValue={post?.content || defaultEditorContent}
          onUpdate={(editor) => {
            dispatch({
              type: 'setData',
              payload: {
                ...state.data,
                content: editor?.storage.markdown.getMarkdown(),
              },
            });
          }}
          debounceDuration={3000}
          onDebouncedUpdate={() => {
            dispatch({
              type: 'setTitleError',
              payload: validateTitle(state.data.title || ''),
            });
            dispatch({
              type: 'setDescriptionError',
              payload: validateDescription(state.data.description || ''),
            });
            dispatch({
              type: 'setContentError',
              payload: validateContent(state.data.content || ''),
            });

            if (
              state.data.title === post.title &&
              state.data.description === post.description &&
              state.data.content === post.content
            ) {
              return;
            }

            if (state.data.title && state.data.description) {
              startTransitionSaving(async () => {
                await updatePost(state.data);
              });
            }
          }}
        />
      </div>
    </>
  );
}
