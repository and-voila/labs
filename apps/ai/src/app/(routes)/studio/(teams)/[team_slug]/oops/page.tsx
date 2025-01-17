import type { Metadata, NextPage } from 'next';

import Link from 'next/link';

import { cn } from '@av/ui';
import { buttonVariants } from '@av/ui/button';
import { APP_BP } from '@av/utils';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';

import { DashboardShell } from '#/components/dashboard/shell';

interface Props {
  params: {
    team_slug: string;
  };
}

const OopsPage: NextPage<Props> = (props) => {
  const { params } = props;

  return (
    <DashboardShell>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-medium uppercase tracking-widest text-primary">
            Oops
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Use personal workspace
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            You&apos;re currently using the{' '}
            <span className="font-semibold text-primary">
              {params.team_slug}
            </span>{' '}
            team. Ready to explore Learn features? Just hop over to{' '}
            <span className="font-semibold">your personal workspace</span>. A
            quick click on the top left team switcher, and you&apos;re in your
            personal zone. Thanks for your patience.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`${APP_BP}/my/workspaces`}
              className={cn(buttonVariants())}
            >
              My workspaces
            </Link>
            <Link
              href={`${APP_BP}/my/support`}
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

export default OopsPage;

export function generateMetadata(): Metadata {
  const title = 'Oops! Not Authorized';
  const description = `Certain features of ${siteConfig.name} are tied to your personal workspace. Check them out. We made learning fast, fun, and fabulous.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/my/workspaces`;

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
