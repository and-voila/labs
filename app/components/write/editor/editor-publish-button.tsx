import { Dispatch } from 'react';

import { updatePostMetadata } from '#/lib/actions';
import { cn } from '#/lib/utils';
import { buttonVariants } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';
import { EditorAction, EditorState } from '#/components/write/editor/editor';
import LoadingDots from '#/components/write/icons/loading-dots';

interface EditorPublishButtonProps {
  isPendingPublishing: boolean;
  isPublishable: boolean;
  published: boolean;
  startTransitionPublishing: (callback: () => Promise<void>) => void;
  postId: string;
  dispatch: Dispatch<EditorAction>;
  state: EditorState;
}

const EditorPublishButton = ({
  isPendingPublishing,
  isPublishable,
  published,
  startTransitionPublishing,
  postId,
  dispatch,
  state,
}: EditorPublishButtonProps) => {
  return (
    <button
      onClick={() => {
        const formData = new FormData();
        formData.append('published', String(!published));
        startTransitionPublishing(async () => {
          await updatePostMetadata(formData, postId, 'published').then(() => {
            toast({
              title: `Successfully ${
                published ? 'unpublished' : 'published'
              } your post.`,
              description: 'Your post status has been updated.',
              variant: 'success',
            });
            dispatch({
              type: 'setData',
              payload: {
                ...state.data,
                published: !published,
              },
            });
          });
        });
      }}
      className={cn(
        buttonVariants({
          variant: published ? 'destructive' : 'default',
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
        <p>{published ? 'Unpublish' : 'Publish'}</p>
      )}
    </button>
  );
};

export default EditorPublishButton;
