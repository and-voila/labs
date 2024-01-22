import { env } from '#/env';

// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache';

import { db } from '#/lib/db';

export async function getSiteData(domain: string) {
  const subdomain = domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;

  return await unstable_cache(
    async () => {
      return db.site.findUnique({
        where: subdomain ? { subdomain } : { customDomain: domain },
        include: { user: true },
      });
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}

export async function getPostsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;

  return await unstable_cache(
    async () => {
      return db.post.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          published: true,
        },
        select: {
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      });
    },
    [`${domain}-posts`],
    {
      revalidate: 900,
      tags: [`${domain}-posts`],
    },
  )();
}

export async function getCollabPostData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;

  return await unstable_cache(
    async () => {
      const data = await db.post.findFirst({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          slug,
          published: true,
        },
        include: {
          site: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!data) return null;

      const adjacentPosts = await db.post.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          published: true,
          NOT: {
            id: data.id,
          },
        },
        select: {
          slug: true,
          title: true,
          createdAt: true,
          description: true,
          image: true,
          imageBlurhash: true,
        },
      });

      return {
        ...data,
        adjacentPosts,
      };
    },
    [`${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${domain}-${slug}`],
    },
  )();
}
