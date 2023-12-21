import { Dispatch, TransitionStartFunction } from 'react';

import {
  EditorAction,
  EditorState,
  PostWithSite,
} from '#/components/publish/editor/editor';
import EditorIpStatusIndicator from '#/components/publish/editor/editor-ip-status-indicator';
import EditorPublishButton from '#/components/publish/editor/editor-publish-button';
import { EditorStatusIndicator } from '#/components/publish/editor/editor-status-indicator';
import { Icons } from '#/components/shared/icons';

interface EditorHeaderProps {
  isPendingSaving: boolean;
  isPendingPublishing: boolean;
  isPublishable: boolean;
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  url: string;
  post: PostWithSite;
  startTransitionPublishing: TransitionStartFunction;
  aiContentPercentage: number;
}

export const EditorHeader = ({
  isPendingSaving,
  isPendingPublishing,
  isPublishable,
  state,
  dispatch,
  url,
  post,
  startTransitionPublishing,
  aiContentPercentage,
}: EditorHeaderProps) => {
  return (
    <div className="mt-6 flex flex-col space-y-6">
      <div className="pb-5 sm:flex sm:items-center sm:justify-between">
        <div className="mx-2 justify-start">
          <EditorIpStatusIndicator aiContentPercentage={aiContentPercentage} />
        </div>
        <div className="mt-3 flex items-center sm:ml-4 sm:mt-0">
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
