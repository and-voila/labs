'use client';

import { useEffect, useReducer, useState, useTransition } from 'react';
import { Post } from '@prisma/client';
import { Editor as NovelEditor } from 'novel';

import { defaultEditorContent } from '@/app/components/write/editor/default-editor-content';
import { EditorHeader } from '@/app/components/write/editor/editor-header';
import PostDescriptionInput from '@/app/components/write/editor/post-description-input';
import PostTitleInput from '@/app/components/write/editor/post-title-input';
import { useKeyboardSave } from '@/app/hooks/use-keyboard-save';
import { updatePost } from '@/app/lib/actions';

export type PostWithSite = Post & { site: { subdomain: string | null } | null };

export interface EditorState {
  data: PostWithSite;
  titleError: string;
  descriptionError: string;
  contentError: string;
}

export type EditorAction =
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

  useKeyboardSave(() => {
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
  });

  return (
    <>
      <EditorHeader
        isPendingSaving={isPendingSaving}
        isPendingPublishing={isPendingPublishing}
        isPublishable={isPublishable}
        state={state}
        dispatch={dispatch}
        url={url}
        post={post}
        startTransitionPublishing={startTransitionPublishing}
      />
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
