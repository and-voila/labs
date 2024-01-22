import { env } from '#/env';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { db } from '#/lib/db';
import {
  getPostsForSite,
  getSiteData,
} from '#/lib/operations/publish/publish-fetchers';
import { placeholderBlurhash, toDateString } from '#/lib/utils';

import BlogCard from '#/components/publish/blog-card';
import BlurImage from '#/components/publish/blur-image';
import { EmptyPlaceholder } from '#/components/shared/empty-placeholder';

export async function generateStaticParams() {
  const allSites = await db.site.findMany({
    select: {
      subdomain: true,
      customDomain: true,
    },
  });

  const allPaths = allSites
    .flatMap(({ subdomain, customDomain }) => [
      subdomain && {
        domain: `${subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
      customDomain && {
        domain: customDomain,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data, posts] = await Promise.all([
    getSiteData(domain),
    getPostsForSite(domain),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="mb-8 w-full px-8 lg:mb-16 lg:px-24">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
          Latest
        </h2>
        {posts.length > 0 ? (
          <div className="mx-auto w-full md:mb-28">
            <Link href={`/${posts[0]?.slug}`}>
              <div className="group relative mx-auto h-80 w-full overflow-hidden sm:h-150 lg:rounded-xl">
                <BlurImage
                  alt={posts[0]?.title ?? ''}
                  blurDataURL={posts[0]?.imageBlurhash ?? placeholderBlurhash}
                  className="h-full w-full object-cover group-hover:scale-105 group-hover:duration-300"
                  width={1200}
                  height={630}
                  placeholder="blur"
                  src={posts[0]?.image ?? '/post-placeholder.jpg'}
                />
              </div>
              <div className="mt-4 flex w-full items-center justify-start space-x-4">
                <div className="relative h-8 w-8 flex-none overflow-hidden rounded-full">
                  {data.user?.image ? (
                    <BlurImage
                      alt={data.user?.name ?? 'User Avatar'}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                      src={data.user?.image}
                    />
                  ) : (
                    <div className="absolute flex h-full w-full select-none items-center justify-center bg-card text-xl text-foreground">
                      ?
                    </div>
                  )}
                </div>
                <p className="ml-3 inline-block whitespace-nowrap align-middle text-sm font-medium md:text-base">
                  By {''}
                  {data.user?.name}
                </p>
                <div className="h-6 border-l border-primary" />
                <p className="m-auto my-5 w-10/12 text-sm text-muted-foreground md:text-base">
                  {toDateString(posts[0].createdAt)}
                </p>
              </div>
              <div className="mx-auto w-5/6 lg:w-full">
                <h2 className="mb-8 font-title text-4xl md:text-6xl">
                  {posts[0]?.title}
                </h2>
                <p className="w-full text-base text-muted-foreground md:text-lg lg:w-4/5">
                  {posts[0]?.description}
                </p>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="file" />
              <EmptyPlaceholder.Title>
                There are no posts yet
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                This site&apos;s journey is just beginning. Check back soon to
                see posts and updates as they&apos;re shared.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          </div>
        )}
      </div>

      {posts.length > 1 && (
        <div className="mx-auto px-8 lg:px-24">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
            Recent Posts
          </h2>
          <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {posts.slice(1).map((metadata: any, index: number) => (
              <BlogCard key={index} data={metadata} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
