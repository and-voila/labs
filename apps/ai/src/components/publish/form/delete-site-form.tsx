'use client';

import { useCallback, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

import { cn } from '@av/ui';
import { buttonVariants } from '@av/ui/button';
import { Icons } from '@av/ui/icons';
import { toast } from '@av/ui/use-toast';
import { APP_BP } from '@av/utils';

import { deleteSite } from '#/lib/actions/publish/publish-actions';

export default function DeleteSiteForm({
  siteName,
  teamSlug,
}: {
  siteName: string;
  teamSlug: string;
}) {
  const { id } = useParams();
  const router = useRouter();

  const handleDelete = useCallback(
    async (data: FormData) => {
      if (window.confirm('Are you sure you want to delete your site?')) {
        const res = await deleteSite(data, id as string, 'delete');
        if (res.error) {
          toast({
            title: 'Could not delete site',
            description: `${res.error}. Please try again.`,
            variant: 'destructive',
          });
        } else {
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

  const [isValid, setIsValid] = useState(false);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsValid(event.target.value === siteName);
    },
    [siteName],
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
          className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
