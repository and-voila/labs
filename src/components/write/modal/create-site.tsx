'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import va from '@vercel/analytics';
import { useFormStatus } from 'react-dom';

import { env } from ':/env.mjs';

import { createSite } from '#/lib/actions';
import { CP_PREFIX } from '#/lib/const';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { toast } from '#/components/ui/use-toast';
import { useModal } from '#/components/write/modal/provider';

export default function CreateSiteModal() {
  const router = useRouter();
  const modal = useModal();

  const [data, setData] = useState({
    name: '',
    subdomain: '',
    description: '',
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, '-'),
    }));
  }, [data.name]);

  return (
    <form
      action={async (data: FormData) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createSite(data).then((res: any) => {
          if (res.error) {
            toast({
              title: 'Sorry, an error occurred',
              description: `${res.error}. Please try again.`,
              variant: 'destructive',
            });
          } else {
            va.track('Created Site');
            const { id } = res;
            router.refresh();
            router.push(`${CP_PREFIX}/tools/write/site/${id}`);
            modal?.hide();

            toast({
              title: 'Your site was created',
              description:
                "Way to go! Your site was created. Let's get started.",
              variant: 'success',
            });
          }
        })
      }
      className="w-full rounded-md bg-card md:max-w-md md:border md:shadow "
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="text-2xl font-bold">Create a new site</h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-muted-foreground"
          >
            Site title
          </label>
          <input
            name="name"
            type="text"
            placeholder="My Awesome Site"
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-border focus:outline-none focus:ring-primary"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="subdomain"
            className="text-sm font-medium text-muted-foreground"
          >
            Subdomain
          </label>
          <div className="flex w-full max-w-md">
            <input
              name="subdomain"
              type="text"
              placeholder="subdomain"
              value={data.subdomain}
              onChange={(e) => setData({ ...data, subdomain: e.target.value })}
              autoCapitalize="off"
              pattern="[a-zA-Z0-9\-]+" // only allow lowercase letters, numbers, and dashes
              maxLength={32}
              required
              className="w-full rounded-md border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-border focus:outline-none focus:ring-primary"
            />
            <div className="flex items-center rounded-r-lg border border-l-0 bg-primary/20 px-3 text-sm">
              .{env.NEXT_PUBLIC_ROOT_DOMAIN}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-muted-foreground"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description about why my site is so awesome"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            maxLength={140}
            rows={3}
            className="w-full rounded-md border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-border focus:outline-none focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border border-t bg-card p-3 md:px-10">
        <CreateSiteFormButton />
      </div>
    </form>
  );
}
function CreateSiteFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        'flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none',
        pending
          ? 'cursor-not-allowed bg-primary font-medium text-background shadow hover:bg-primary/70 disabled:opacity-50 dark:text-foreground'
          : 'bg-primary font-medium text-background shadow hover:bg-primary/70 dark:text-foreground',
      )}
      disabled={pending}
    >
      {pending ? (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      ) : (
        <p>Create Site</p>
      )}
    </button>
  );
}
