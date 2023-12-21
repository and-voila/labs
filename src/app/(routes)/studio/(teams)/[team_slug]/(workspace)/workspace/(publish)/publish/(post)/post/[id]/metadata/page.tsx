/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { updatePostMetadata } from '#/lib/actions/publish/publish-actions';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';

import { DashboardHeader } from '#/components/dashboard/header';
import Form from '#/components/publish/form';

export default async function PostIdMetadata({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const post = await db.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    cacheStrategy: {
      ttl: 20,
      swr: 10,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title="Post metadata"
        description="Let AI be your co-pilot in crafting the perfect metadata. From drafting SEO-friendly slugs to generating OpenGraph images, we got you covered."
      />
      <div className="my-8 grid max-w-3xl gap-8 md:my-12">
        <Form
          title="Post Slug"
          description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
          helpText="Please use a slug that is unique to this post."
          inputAttrs={{
            name: 'slug',
            type: 'text',
            defaultValue: post?.slug!,
            placeholder: 'slug',
          }}
          handleSubmit={updatePostMetadata}
        />
        <Form
          title="Thumbnail image"
          description="The thumbnail image for your post. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 50MB. Recommended size 1200x630."
          inputAttrs={{
            name: 'image',
            type: 'file',
            defaultValue: post?.image!,
          }}
          handleSubmit={updatePostMetadata}
        />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'My Post Metadata';
  const description =
    'Manage your post metadata with ease. Our fine-tuned, task-specific AI is here to help. Spend less time on the details and more on creating impactful content.';

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
