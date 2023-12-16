import { notFound } from 'next/navigation';
import { allInsights } from 'contentlayer/generated';

import { getTableOfContents } from '#/lib/toc';

import { Mdx } from '#/components/content/mdx-components';
import { InsightsPageHeader } from '#/components/insights/page-header';
import { InsightsPager } from '#/components/insights/pager';
import { DashboardTableOfContents } from '#/components/shared/toc';

import '#/styles/mdx.css';

import { Metadata } from 'next';

import { SITE_URL } from '#/lib/const';
import { absoluteUrl } from '#/lib/utils';

interface InsightPageProps {
  params: {
    slug: string[];
  };
}

async function getInsightFromParams(params: InsightPageProps['params']) {
  const slug = params.slug?.join('/') || '';
  const insight = allInsights.find((insight) => insight.slugAsParams === slug);

  if (!insight) {
    null;
  }

  return insight;
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const insight = await getInsightFromParams(params);

  if (!insight) {
    return {};
  }

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', insight.title);

  return {
    title: insight.title,
    description: insight.description,
    openGraph: {
      title: insight.title,
      description: insight.description,
      type: 'article',
      url: absoluteUrl(insight.slug),
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: insight.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: insight.title,
      description: insight.description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: insight.title,
        },
      ],
    },
  };
}

export async function generateStaticParams(): Promise<
  InsightPageProps['params'][]
> {
  return allInsights.map((insight) => ({
    slug: insight.slugAsParams.split('/'),
  }));
}

export default async function InsightsPage({ params }: InsightPageProps) {
  const insight = await getInsightFromParams(params);

  if (!insight) {
    notFound();
  }

  const toc = await getTableOfContents(insight.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <InsightsPageHeader
          heading={insight.title}
          text={insight.description}
        />
        <Mdx code={insight.body.code} />
        <hr className="my-4 md:my-6" />
        <InsightsPager insight={insight} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
