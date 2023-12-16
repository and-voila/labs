import { Metadata } from 'next';
import Link from 'next/link';

import { APP_BP, BASE_URL } from '#/lib/const';
import { cn } from '#/lib/utils';

import { DashboardShell } from '#/components/dashboard/shell';
import { buttonVariants } from '#/components/ui/button';

const TeamNotFound = () => {
  return (
    <DashboardShell>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-medium uppercase tracking-widest text-primary">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Looks like this page took a personal day. Sorry, we couldn&apos;t
            find it for you.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`${APP_BP}/settings/workspaces`}
              className={cn(buttonVariants())}
            >
              Dashboard
            </Link>
            <Link
              href={`${APP_BP}/settings/support`}
              className="text-sm font-semibold text-muted-foreground hover:text-muted-foreground/80"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
};

export default TeamNotFound;

export function generateMetadata(): Metadata {
  const title = '404 Not Found';
  const description =
    "Oops! Even our links get lost sometimes. This And Voila page has vanished, but your digital marketing journey hasn't.";

  const ogImageUrl = new URL(`${BASE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${BASE_URL}${APP_BP}/settings/advanced`;

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: pageUrl,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };

  return metadata;
}
