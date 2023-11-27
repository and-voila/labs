import { Dispatch } from 'react';

import { buttonVariants } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';
import { EditorAction, EditorState } from '@/app/components/write/editor';
import LoadingDots from '@/app/components/write/icons/loading-dots';
import { updatePostMetadata } from '@/app/lib/actions';
import { cn } from '@/app/lib/utils';

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
