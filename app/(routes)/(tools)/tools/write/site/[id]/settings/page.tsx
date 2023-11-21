/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';

import Form from '@/app/components/write/form';
import DeleteSiteForm from '@/app/components/write/form/delete-site-form';
import { updateSite } from '@/app/lib/actions';
import { db } from '@/app/lib/db';

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await db.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Name"
        description="The name of your site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: 'name',
          type: 'text',
          defaultValue: data?.name!,
          placeholder: 'My Awesome Site',
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Description"
        description="The description of your site. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: 'description',
          type: 'text',
          defaultValue: data?.description!,
          placeholder: 'A blog about really interesting things.',
        }}
        handleSubmit={updateSite}
      />

      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Site Settings';
  const description =
    'Personalize your site with And Voila Site Settings. Update the name, description, featured image, domain, and logo. Or delete with ease for total control.';

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
