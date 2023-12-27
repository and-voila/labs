'use client';

import { useCallback, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import va from '@vercel/analytics';
import { useFormStatus } from 'react-dom';

import { deletePost } from '#/lib/actions/publish/publish-actions';
import { APP_BP } from '#/lib/const';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';

export default function DeletePostForm({
  postName,
  teamSlug,
}: {
  postName: string;
  teamSlug: string;
}) {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const handleDelete = useCallback(
    async (data: FormData) => {
      if (window.confirm('Are you sure you want to delete your post?')) {
        const res = await deletePost(data, id, 'delete');
        if (res.error) {
          toast({
            title: 'Could not delete post',
            description: res.error,
            variant: 'destructive',
          });
        } else {
          va.track('Deleted Post');
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
      setIsValid(event.target.value === postName);
    },
    [postName],
  );

  return (
    <form
      action={handleDelete}
      className="max-w-3xl rounded-lg border border-destructive bg-card"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="text-xl font-semibold">Delete Post</h2>
        <p className="text-sm text-muted-foreground">
          Deletes your post permanently. Type in the name of your post{' '}
          <b>{postName}</b> to confirm.
        </p>

        <input
          name="confirm"
          type="text"
          required
          pattern={postName}
          placeholder={postName}
          className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-border bg-card p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
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
