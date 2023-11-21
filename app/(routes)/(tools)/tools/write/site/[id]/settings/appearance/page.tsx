/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';

import Form from '@/app/components/write/form';
import { updateSite } from '@/app/lib/actions';
import { db } from '@/app/lib/db';

export default async function SiteSettingsAppearance({
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
        title="Thumbnail image"
        description="The thumbnail image for your site. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 50MB. Recommended size 1200x630."
        inputAttrs={{
          name: 'image',
          type: 'file',
          defaultValue: data?.image!,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Logo"
        description="The logo for your site. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 50MB. Recommended size 400x400."
        inputAttrs={{
          name: 'logo',
          type: 'file',
          defaultValue: data?.logo!,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Font"
        description="The font for the heading text your site."
        helpText="Please select a font."
        inputAttrs={{
          name: 'font',
          type: 'select',
          defaultValue: data?.font!,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="404 Page Message"
        description="Message to be displayed on the 404 page."
        helpText="Please use 240 characters maximum."
        inputAttrs={{
          name: 'message404',
          type: 'text',
          defaultValue: data?.message404!,
          placeholder: "Blimey! You've found a page that doesn't exist.",
          maxLength: 240,
        }}
        handleSubmit={updateSite}
      />
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Site Appearance';
  const description =
    'Craft a stunning visual identity with And Voila Site Appearance. Select fonts, add logos, and set featured images for OpenGraph and Twitter.';

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
