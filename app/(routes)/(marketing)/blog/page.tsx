import { Metadata } from 'next';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

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
  const description =
    "Dive into And Voila's Blog for fresh, snackable posts, and videos that help digital marketers thrive. Want more insights? Create a free account now.";

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/blog`;

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
