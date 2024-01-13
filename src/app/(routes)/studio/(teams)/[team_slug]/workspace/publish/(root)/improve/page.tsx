import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { APP_BP, SITE_URL } from '#/lib/const';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import { EmptyPlaceholder } from '#/components/shared/empty-placeholder';
import { Separator } from '#/components/ui/separator';

export default async function WorkspaceImprovePage({
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
        title="Improve"
        description="Coming soon, a suite of optimization tools to make your metrics dance."
      />
      <div className="my-8 flex flex-col md:my-12">
        <h3 className="text-lg font-semibold leading-6">
          Awesome AI-assisted tools on the horizon
        </h3>
        <Separator className="mb-6 mt-2" />
      </div>
      <div className="max-w-3xl justify-start">
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="rocket" />
          <EmptyPlaceholder.Title>Coming soon</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            We got some really cool tools on their way to help you crush it.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Measure & Improve';
  const description =
    'Crank up your digital presence with our Measure & Improve tools. Analyze performance, optimize strategies, and boost your online growth. And voila, watch the ROI roll in.';

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
