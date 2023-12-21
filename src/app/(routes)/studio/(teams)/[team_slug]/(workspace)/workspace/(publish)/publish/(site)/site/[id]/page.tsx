import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Separator } from ':/src/components/ui/separator';

import { siteConfig } from '#/config/site';

import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import CreatePostButton from '#/components/publish/create-post-button';
import OverviewSitesCTA from '#/components/publish/overview-sites-cta';
import Posts from '#/components/publish/posts';
import { Icons } from '#/components/shared/icons';

export default async function SiteManage({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const team = await getTeam(params.team_slug);
  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }
  const site = await db.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    cacheStrategy: {
      ttl: 20,
      swr: 10,
    },
  });

  if (!site || site.teamId !== team.id) {
    notFound();
  }

  const url = `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <DashboardHeader
        title={`Manage ${site.name}`}
        description="From crafting engaging posts to personalizing your domain, logo, and tyopography. It's all about making your site truly yours."
      >
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${site.subdomain}.localhost:3001`
          }
          target="_blank"
          rel="noreferrer"
          className="mr-2 mt-4 inline-flex w-full items-center truncate rounded-md text-xs text-foreground underline underline-offset-4 transition-colors hover:opacity-70 md:mt-0 md:w-auto md:py-0"
        >
          {url}
          {''}
          <Icons.arrowSquareOut className="ml-1 h-4 w-4 text-primary" />
        </a>
        <OverviewSitesCTA teamSlug={params.team_slug} />
        <CreatePostButton />
      </DashboardHeader>
      <div className="my-8 flex flex-col md:my-12">
        <h3 className="text-lg font-semibold leading-6">
          Posts for {site.name}
        </h3>
        <Separator className="mb-6 mt-2 bg-primary/80" />
        <Posts
          siteId={decodeURIComponent(params.id)}
          teamSlug={params.team_slug}
        />
      </div>
    </>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Manage Site';
  const description = `Make your ${siteConfig.name} blog site your own. Draft and publish posts, customize the domain, logo, and fonts. Or delete with ease for total control`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/workspace/publish`;

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
