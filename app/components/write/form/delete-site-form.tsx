'use client';

import { useParams, useRouter } from 'next/navigation';
import va from '@vercel/analytics';
import { useFormStatus } from 'react-dom';

import { buttonVariants } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';
import LoadingDots from '@/app/components/write/icons/loading-dots';
import { deleteSite } from '@/app/lib/actions';
import { cn } from '@/app/lib/utils';

export default function DeleteSiteForm({ siteName }: { siteName: string }) {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) =>
        window.confirm('Are you sure you want to delete your site?') &&
        deleteSite(data, id, 'delete')
          .then(async (res) => {
            if (res.error) {
              toast({
                title: 'Could not delete site',
                description: `${res.error}. Please try again.`,
                variant: 'destructive',
              });
            } else {
              va.track('Deleted Site');
              router.refresh();
              router.push('/tools/write/sites');
              toast({
                title: 'Your site was deleted',
                description:
                  "Your site was deleted. Create another one so your fans don't miss you.",
                variant: 'success',
              });
            }
          })
          .catch((err: Error) => {
            toast({
              title: 'Error',
              description: `${err.message}. Please try again.`,
              variant: 'destructive',
            });
          })
      }
      className="max-w-3xl rounded-lg border border-destructive bg-card"
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

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-primary-foreground p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
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
