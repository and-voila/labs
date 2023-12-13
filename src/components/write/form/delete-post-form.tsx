'use client';

import { useParams, useRouter } from 'next/navigation';
import va from '@vercel/analytics';
import { useFormStatus } from 'react-dom';

import { deletePost } from '#/lib/actions';
import { CP_PREFIX } from '#/lib/const';
import { cn } from '#/lib/utils';

import { buttonVariants } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';
import LoadingDots from '#/components/write/icons/loading-dots';

export default function DeletePostForm({ postName }: { postName: string }) {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) =>
        window.confirm('Are you sure you want to delete your post?') &&
        deletePost(data, id, 'delete').then((res) => {
          if (res.error) {
            toast({
              title: 'Could not delete post',
              description: res.error,
              variant: 'destructive',
            });
          } else {
            va.track('Deleted Post');
            router.refresh();
            router.push(`${CP_PREFIX}/tools/write/site/${res.siteId}`);
            toast({
              title: 'Post deleted',
              description:
                "Your post was deleted successfully. Create another one so your audience doesn't miss you.",
              variant: 'success',
            });
          }
        })
      }
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
          className="w-full max-w-md rounded-md border-border bg-background text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-ring"
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-border bg-card p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-center text-sm text-muted-foreground">
          This action is irreversible. Please proceed with caution.
        </p>
        <FormButton />
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(buttonVariants({ variant: 'destructive', size: 'sm' }), {
        'cursor-not-allowed opacity-50': pending,
      })}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Delete</p>}
    </button>
  );
}
