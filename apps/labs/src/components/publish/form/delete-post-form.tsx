'use client';

import { useCallback, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

import { cn } from '@and-voila/ui';
import { buttonVariants } from '@and-voila/ui/button';
import { Icons } from '@and-voila/ui/icons';
import { toast } from '@and-voila/ui/use-toast';

import { deletePost } from '#/lib/actions/publish/publish-actions';
import { APP_BP } from '#/lib/const';

const UNTITLED_POST_NAME = 'My untitled post';

export default function DeletePostForm({
  postName,
  teamSlug,
}: {
  postName: string;
  teamSlug: string;
}) {
  const { id } = useParams();
  const router = useRouter();

  const displayPostName = postName ?? UNTITLED_POST_NAME;

  const handleDelete = useCallback(
    async (data: FormData) => {
      if (window.confirm('Are you sure you want to delete your post?')) {
        const res = await deletePost(data, id as string, 'delete');
        if (res.error) {
          toast({
            title: 'Could not delete post',
            description: res.error,
            variant: 'destructive',
          });
        } else {
          router.refresh();
          router.push(
            `${APP_BP}/${teamSlug}/workspace/publish/site/${res.siteId}`,
          );
          toast({
            title: 'Post deleted',
            description:
              "Your post was deleted successfully. Create another one so your audience doesn't miss you.",
            variant: 'success',
          });
        }
      }
    },
    [id, teamSlug, router],
  );

  const [isValid, setIsValid] = useState(false);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsValid(event.target.value === displayPostName);
    },
    [displayPostName],
  );

  return (
    <form
      action={handleDelete}
      className="max-w-3xl rounded-lg border border-destructive bg-card"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="text-xl font-semibold">Delete Post</h2>
        <p className="text-sm text-muted-foreground">
          To proceed, please type in the name of your post exactly as shown{' '}
          <b>{displayPostName}</b> to confirm.
        </p>

        <input
          name="confirm"
          type="text"
          required
          pattern={displayPostName}
          placeholder={displayPostName}
          className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-card p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-center text-sm text-muted-foreground">
          This action is irreversible. Please proceed with caution.
        </p>
        <FormButton isValid={isValid} />
      </div>
    </form>
  );
}

function FormButton({ isValid }: { isValid: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(buttonVariants({ variant: 'destructive', size: 'sm' }), {
        'cursor-not-allowed opacity-50': pending || !isValid,
      })}
      disabled={pending || !isValid}
    >
      {pending ? (
        <>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Just a sec
        </>
      ) : (
        <p>Delete</p>
      )}
    </button>
  );
}
