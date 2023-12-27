'use client';

import { useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import va from '@vercel/analytics';
import { useFormStatus } from 'react-dom';

import { deleteSite } from '#/lib/actions/publish/publish-actions';
import { APP_BP } from '#/lib/const';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';

export default function DeleteSiteForm({
  siteName,
  teamSlug,
}: {
  siteName: string;
  teamSlug: string;
}) {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const handleDelete = useCallback(
    async (data: FormData) => {
      if (window.confirm('Are you sure you want to delete your site?')) {
        const res = await deleteSite(data, id, 'delete');
        if (res.error) {
          toast({
            title: 'Could not delete site',
            description: `${res.error}. Please try again.`,
            variant: 'destructive',
          });
        } else {
          va.track('Deleted Site');
          router.refresh();
          router.push(`${APP_BP}/${teamSlug}/workspace/publish/sites`);
          toast({
            title: 'Your site was deleted',
            description:
              "Your site was deleted. Create another one so your fans don't miss you.",
            variant: 'success',
          });
        }
      }
    },
    [id, teamSlug, router],
  );

  return (
    <form
      action={handleDelete}
      className="max-w-3xl rounded-lg border-2 border-destructive bg-card"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="text-xl font-semibold">Delete Site</h2>
        <p className="text-sm text-muted-foreground">
          Deletes your site and all posts associated with it. Type in the name
          of your site <b>{siteName}</b> to confirm.
        </p>

        <input
          name="confirm"
          type="text"
          required
          pattern={siteName}
          placeholder={siteName}
          className="w-full max-w-md rounded-md border bg-background text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-ring"
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-card p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
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
