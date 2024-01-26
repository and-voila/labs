'use client';

import { useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';

import { cn } from '@av/ui';
import { Icons } from '@av/ui/icons';
import { toast } from '@av/ui/use-toast';

import { siteConfig } from '#/config/site';

import { sendAbuseReportEmail } from '#/lib/resend/send-abuse-report';

export default function ReportAbuse() {
  const [open, setOpen] = useState(false);
  const { domain, slug } = useParams();
  const url = slug
    ? `https://${domain as string}/${slug as string}`
    : `https://${domain as string}`;

  const handleButtonClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleFormAction = useCallback(async () => {
    try {
      await sendAbuseReportEmail(domain as string, slug as string);
      setOpen(false);
      toast({
        title: 'Your report has been submitted',
        description: `Thanks for helping make ${siteConfig.name} a safer place. We'll review your report and take action as per our Terms of Service.`,
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          'There was an issue submitting your report. Please try again.',
        variant: 'destructive',
      });
    }
  }, [domain, slug]);

  return (
    <>
      <button
        className="flex flex-row items-center gap-1 border border-destructive px-2 py-1 text-sm text-destructive hover:text-red-600"
        onClick={handleButtonClick}
      >
        Report{''}
        <Icons.warning className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed bottom-5 right-5">
          <form
            action={handleFormAction}
            className="absolute bottom-20 right-2 flex w-96 flex-col space-y-6 rounded-lg border bg-card p-8 shadow-lg animate-in slide-in-from-bottom-5"
          >
            <div>
              <h2 className="text-xl font-semibold leading-7 text-foreground">
                Report Abuse
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground lg:text-base">
                Found a site with abusive content? Let us know anonymously.
              </p>
            </div>

            <div>
              <label
                htmlFor="domain"
                className="block text-sm font-medium leading-6 text-red-500"
              >
                URL to report
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="url"
                  id="url"
                  readOnly
                  value={url}
                  className="block w-full cursor-not-allowed rounded-md border bg-card text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-ring"
                />
              </div>
            </div>

            <SubmitButton />
          </form>
        </div>
      )}
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        'h flex h-8 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10 ',
        pending
          ? 'cursor-not-allowed opacity-50'
          : 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      )}
      disabled={pending}
    >
      {pending ? (
        <>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Just a sec
        </>
      ) : (
        <p>Report Abuse</p>
      )}
    </button>
  );
}
