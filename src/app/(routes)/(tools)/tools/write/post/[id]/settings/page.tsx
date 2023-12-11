/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { updatePostMetadata } from '#/lib/actions';
import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import Form from '#/components/write/form';
import DeletePostForm from '#/components/write/form/delete-post-form';

export default async function PostSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  const data = await db.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    cacheStrategy: {
      ttl: 300,
      swr: 60,
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }
  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <DashboardHeader
          heading={`Settings for ${data?.title!}`}
          text={`Personalize the slug, set a featured image, or delete this post. Tailor ${data?.title!} to best suit your audience and SEO needs.`}
        />
        <Form
          title="Post Slug"
          description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
          helpText="Please use a slug that is unique to this post."
          inputAttrs={{
            name: 'slug',
            type: 'text',
            defaultValue: data?.slug!,
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
            defaultValue: data?.image!,
          }}
          handleSubmit={updatePostMetadata}
        />

        <DeletePostForm postName={data?.title!} />
      </div>
    </DashboardShell>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Post Settings';
  const description =
    'Tailor your posts to perfection with And Voila Post Settings. Set friendly slugs for SEO and add compelling featured images for greater impact.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/tools/write`;

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
