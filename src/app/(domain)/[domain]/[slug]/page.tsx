import { notFound } from 'next/navigation';

import { env } from 'env';

import { db } from '#/lib/db';
import {
  getCollabPostData,
  getSiteData,
} from '#/lib/operations/publish/publish-fetchers';
import { placeholderBlurhash, toDateString } from '#/lib/utils';

import BlogCard from '#/components/publish/blog-card';
import BlurImage from '#/components/publish/blur-image';
import WriteCta from '#/components/publish/cta';

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getCollabPostData(domain, slug),
    getSiteData(domain),
  ]);
  if (!data || !siteData) {
    return {};
  }
  const { title, description } = data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: '/open-graph.jpg',
          width: 1200,
          height: 630,
          alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: '/open-graph.jpg',
          alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
        },
      ],
    },
    ...(params.domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
      siteData.customDomain && {
        alternates: {
          canonical: `https://${siteData.customDomain}/${params.slug}`,
        },
      }),
  };
}

export async function generateStaticParams() {
  const allPosts = await db.post.findMany({
    select: {
      slug: true,
      site: {
        select: {
          subdomain: true,
          customDomain: true,
        },
      },
    },
  });

  const allPaths = allPosts
    .flatMap(({ site, slug }) => [
      site?.subdomain && {
        domain: `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        slug,
      },
      site?.customDomain && {
        domain: site.customDomain,
        slug,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SitePostPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const data = await getCollabPostData(domain, slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* Background image */}
      {data.image && (
        <div className="absolute inset-0 box-content h-128 pt-96">
          <BlurImage
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            src={data.image}
            width={1440}
            height={577}
            placeholder="blur"
            blurDataURL={placeholderBlurhash}
            role="img"
            alt={data.title || 'A featured image for the post'}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/20"
            aria-hidden="true"
          />
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center justify-center ">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm font-medium text-primary md:text-base">
            {toDateString(data.createdAt)}
          </p>
          <h1 className="mb-10 font-title text-3xl font-bold leading-snug md:text-7xl">
            {data.title}
          </h1>
          <p className="text-md m-auto w-10/12 text-foreground md:text-lg">
            {data.description}
          </p>
        </div>
        <div className="my-8">
          <div className="relative inline-block h-8 w-8 overflow-hidden rounded-full align-middle md:h-10 md:w-10">
            {data.site?.user?.image ? (
              <BlurImage
                alt={data.site?.user?.name ?? 'User Avatar'}
                height={80}
                src={data.site.user.image}
                width={80}
              />
            ) : (
              <div className="absolute flex h-full w-full select-none items-center justify-center bg-card text-4xl">
                ?
              </div>
            )}
          </div>
          <div className="text-md ml-3 inline-block align-middle">
            by <span className="font-semibold">{data.site?.user?.name}</span>
          </div>
        </div>
        <div className="w-3/5 border-t border-primary py-8" />
        <div
          className="prose prose-gray lg:prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data.content || '' }}
        />
        <div className="my-12 px-6 lg:px-8">
          <WriteCta domain={domain} />
        </div>
      </div>

      {data.adjacentPosts.length > 0 && (
        <div className="relative mb-20 mt-10 sm:mt-20">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-primary" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-sm uppercase tracking-widest text-muted-foreground">
              Continue Reading
            </span>
          </div>
        </div>
      )}
      {data.adjacentPosts && (
        <div className="mx-5 grid max-w-screen-xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data.adjacentPosts.map((data: any, index: number) => (
            <BlogCard key={index} data={data} />
          ))}
        </div>
      )}
    </>
  );
}
