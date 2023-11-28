import { Dispatch, TransitionStartFunction } from 'react';

import { Icons } from '@/app/components/shared/icons';
import {
  EditorAction,
  EditorState,
  PostWithSite,
} from '@/app/components/write/editor/editor';
import EditorPublishButton from '@/app/components/write/editor/editor-publish-button';
import { EditorStatusIndicator } from '@/app/components/write/editor/editor-status-indicator';

interface EditorHeaderProps {
  isPendingSaving: boolean;
  isPendingPublishing: boolean;
  isPublishable: boolean;
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  url: string;
  post: PostWithSite;
  startTransitionPublishing: TransitionStartFunction;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  isPendingSaving,
  isPendingPublishing,
  isPublishable,
  state,
  dispatch,
  url,
  post,
  startTransitionPublishing,
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="pb-5 sm:flex sm:items-center sm:justify-end">
        <div className="mt-3 flex sm:ml-4 sm:mt-0">
          {state.data.published && (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Icons.arrowSquareOut className="mr-2 inline-flex h-4 w-4 items-center text-primary" />
            </a>
          )}
          <EditorStatusIndicator
            isPendingSaving={isPendingSaving}
            state={state}
            dispatch={dispatch}
          />
          <EditorPublishButton
            isPendingPublishing={isPendingPublishing}
            isPublishable={isPublishable}
            published={state.data.published}
            startTransitionPublishing={startTransitionPublishing}
            postId={post.id}
            dispatch={dispatch}
            state={state}
          />
        </div>
      </div>
    </div>
  );
};
