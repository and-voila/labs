/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';

import Form from '@/app/components/write/form';
import { updateSite } from '@/app/lib/actions';
import { db } from '@/app/lib/db';

export default async function SiteSettingsDomains({
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
        title="Subdomain"
        description="The subdomain for your site."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: 'subdomain',
          type: 'text',
          defaultValue: data?.subdomain!,
          placeholder: 'subdomain',
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Custom Domain"
        description="The custom domain for your site."
        helpText="Please enter a valid domain."
        inputAttrs={{
          name: 'customDomain',
          type: 'text',
          defaultValue: data?.customDomain!,
          placeholder: 'yourdomain.com',
          maxLength: 64,
          pattern: '^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$',
        }}
        handleSubmit={updateSite}
      />
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Site Domain';
  const description =
    'Define your online identity with And Voila Site Domain. Effortlessly update your subdomain or elevate your brand with a custom domain.';

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
