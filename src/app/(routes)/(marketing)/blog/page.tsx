import { Metadata } from 'next';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';

import { BlogPosts } from '#/components/blog-posts';

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .map((post) => ({
      ...post,
      description: post.description || '',
    }));

  return (
    <main>
      <BlogPosts posts={posts} />
    </main>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Blog';
  const description = `Dive into ${siteConfig.name}'s Blog for fresh, snackable posts, and videos that help digital marketers thrive. Want more insights? Create a free account now.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}/blog`;

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
