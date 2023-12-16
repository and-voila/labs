import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allGuides } from 'contentlayer/generated';

import { getTableOfContents } from '#/lib/toc';

import { Mdx } from '#/components/content/mdx-components';
import { InsightsPageHeader } from '#/components/insights/page-header';
import { Icons } from '#/components/shared/icons';
import { DashboardTableOfContents } from '#/components/shared/toc';

import '#/styles/mdx.css';

import { Metadata } from 'next';

import { SITE_URL } from '#/lib/const';
import { absoluteUrl, cn } from '#/lib/utils';

import { buttonVariants } from '#/components/ui/button';

interface GuidePageProps {
  params: {
    slug: string[];
  };
}

async function getGuideFromParams(params: GuidePageProps['params']) {
  const slug = params?.slug?.join('/');
  const guide = allGuides.find((guide) => guide.slugAsParams === slug);

  if (!guide) {
    null;
  }

  return guide;
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const guide = await getGuideFromParams(params);

  if (!guide) {
    return {};
  }

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', guide.title);

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      url: absoluteUrl(guide.slug),
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
  };
}

export async function generateStaticParams(): Promise<
  GuidePageProps['params'][]
> {
  return allGuides.map((guide) => ({
    slug: guide.slugAsParams.split('/'),
  }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = await getGuideFromParams(params);

  if (!guide) {
    notFound();
  }

  const toc = await getTableOfContents(guide.body.raw);

  return (
    <main className="relative py-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-10 xl:gap-20">
      <div>
        <InsightsPageHeader heading={guide.title} text={guide.description} />
        <Mdx code={guide.body.code} />
        <hr className="my-4" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/guides"
            className={cn(buttonVariants({ variant: 'ghost' }))}
          >
            <Icons.caretLeft className="mr-2 h-4 w-4" />
            See all guides
          </Link>
        </div>
      </div>
      <div className="hidden text-sm lg:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
