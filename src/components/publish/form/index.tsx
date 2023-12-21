/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useParams, useRouter } from 'next/navigation';
import va from '@vercel/analytics';
import { useSession } from 'next-auth/react';
import { useFormStatus } from 'react-dom';

import { cn } from '#/lib/utils';

import DomainConfiguration from '#/components/publish/form/domain-configuration';
import DomainStatus from '#/components/publish/form/domain-status';
import Uploader from '#/components/publish/form/uploader';
import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';
import { toast } from '#/components/ui/use-toast';

export default function Form({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
}: {
  title: string;
  description: string;
  helpText: string;
  inputAttrs: {
    name: string;
    type: string;
    defaultValue: string;
    placeholder?: string;
    maxLength?: number;
    pattern?: string;
  };
  handleSubmit: any;
}) {
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const { update } = useSession();
  return (
    <form
      action={async (data: FormData) => {
        if (
          inputAttrs.name === 'customDomain' &&
          inputAttrs.defaultValue &&
          data.get('customDomain') !== inputAttrs.defaultValue &&
          !confirm('Are you sure you want to change your custom domain?')
        ) {
          return;
        }
        handleSubmit(data, id, inputAttrs.name).then(async (res: any) => {
          if (res.error) {
            toast({
              title: "We couldn't update your domain",
              description: `${res.error}. Please try again.`,
              variant: 'destructive',
            });
          } else {
            va.track(`Updated ${inputAttrs.name}`, id ? { id } : {});
            if (id) {
              router.refresh();
            } else {
              await update();
              router.refresh();
            }
            toast({
              title: 'Domain updated',
              description: `Your domain ${inputAttrs.name} was updated successfully.`,
              variant: 'success',
            });
          }
        });
      }}
      className="max-w-3xl rounded-lg border-border bg-card"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
        {inputAttrs.name === 'image' || inputAttrs.name === 'logo' ? (
          <Uploader
            defaultValue={inputAttrs.defaultValue}
            name={inputAttrs.name}
          />
        ) : inputAttrs.name === 'font' ? (
          <div className="flex max-w-sm items-center overflow-hidden rounded-lg border-border">
            <select
              name="font"
              defaultValue={inputAttrs.defaultValue}
              className="w-full rounded-none border-none bg-background px-4 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-ring"
            >
              <option value="font-cal">Cal Sans</option>
              <option value="font-lora">Lora</option>
              <option value="font-work">Work Sans</option>
            </select>
          </div>
        ) : inputAttrs.name === 'subdomain' ? (
          <div className="flex w-full max-w-md">
            <input
              {...inputAttrs}
              required
              className="z-10 flex-1 rounded-l-md border-border bg-background text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-ring"
            />
            <div className="flex items-center rounded-r-lg border-l-0 border-border bg-primary/20 px-3 text-sm">
              {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
            </div>
          </div>
        ) : inputAttrs.name === 'customDomain' ? (
          <div className="relative flex w-full max-w-md">
            <input
              {...inputAttrs}
              className="z-10 flex-1 rounded-md border-border bg-background text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-ring"
            />
            {inputAttrs.defaultValue && (
              <div className="absolute right-3 z-10 flex h-full items-center">
                <DomainStatus domain={inputAttrs.defaultValue} />
              </div>
            )}
          </div>
        ) : inputAttrs.name === 'description' ? (
          <textarea
            {...inputAttrs}
            rows={3}
            required
            className="w-full max-w-xl rounded-md border-border bg-background text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-ring"
          />
        ) : (
          <input
            {...inputAttrs}
            required
            className="w-full max-w-md rounded-md border-border bg-background text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-ring"
          />
        )}
      </div>
      {inputAttrs.name === 'customDomain' && inputAttrs.defaultValue && (
        <DomainConfiguration domain={inputAttrs.defaultValue} />
      )}
      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-border bg-card p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-sm text-muted-foreground">{helpText}</p>
        <FormButton />
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(buttonVariants({ size: 'sm' }), {
        'cursor-not-allowed opacity-50': pending,
      })}
      disabled={pending}
    >
      {pending ? (
        <>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Just a sec
        </>
      ) : (
        <p>Save</p>
      )}
    </button>
  );
}
