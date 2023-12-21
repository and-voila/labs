import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { APP_BP, SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import { EmptyPlaceholder } from '#/components/shared/empty-placeholder';
import { Separator } from '#/components/ui/separator';

export default async function WorkspacePlanPage({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const team = await getTeam(params.team_slug);
  if (!team) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Plan"
        description="Think of this as your digital marketing war room. It's where research meets planning, and your content comes to life with a sprinkle of AI magic."
      />
      <div className="my-8 flex flex-col md:my-12">
        <h3 className="text-lg font-semibold leading-6">
          Awesome AI-assisted planning tools on the horizon
        </h3>
        <Separator className="mb-6 mt-2 bg-primary/80" />
      </div>
      <div className="max-w-3xl justify-start">
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="courses" />
          <EmptyPlaceholder.Title>Coming soon</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            We&apos;re busy building out our own workflow to help your
            streamline yours.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'AI Content Planner';
  const description =
    'Streamline your strategy with our AI Content Planner. Create, customize, and launch your site in a jiffy. Take control and shine online.';

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/workspace/publish/sites`;

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
