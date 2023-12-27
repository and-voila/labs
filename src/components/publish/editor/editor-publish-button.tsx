import { Dispatch, useCallback } from 'react';

import { updatePostMetadata } from '#/lib/actions/publish/publish-actions';
import { cn } from '#/lib/utils';

import { EditorAction, EditorState } from '#/components/publish/editor/editor';
import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';

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
  const handleClick = useCallback(() => {
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
  }, [published, startTransitionPublishing, postId, dispatch, state]);

  return (
    <button
      onClick={handleClick}
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
        <>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Just a sec
        </>
      ) : (
        <p>{published ? 'Unpublish' : 'Publish'}</p>
      )}
    </button>
  );
};

export default EditorPublishButton;
