/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { updateSite } from '#/lib/actions/publish/publish-actions';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';

import { DashboardHeader } from '#/components/dashboard/header';
import Form from '#/components/publish/form';

export default async function SiteIdAppearance({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const site = await db.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    cacheStrategy: {
      ttl: 20,
      swr: 10,
    },
  });

  if (!site) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title={`Appearance settings of ${site?.name}`}
        description="Dress up your site. Play with logos, colors, fonts, and even craft a cheeky 404 message. It's your site's wardrobe, have fun."
      />
      <div className="my-8 grid max-w-3xl gap-8 md:my-12">
        <Form
          title="Featured image"
          description="Add or replace the featured image for your site. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 1MB. Recommended size 1200x630."
          inputAttrs={{
            name: 'image',
            type: 'file',
            defaultValue: site?.image!,
          }}
          handleSubmit={updateSite}
        />
        <Form
          title="Site logo"
          description="Add or update the logo and favicon for your site. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 1MB. Recommended size 400x400."
          inputAttrs={{
            name: 'logo',
            type: 'file',
            defaultValue: site?.logo!,
          }}
          handleSubmit={updateSite}
        />
        <Form
          title="Headings font"
          description="The font for the headings on your site."
          helpText="Please select a font."
          inputAttrs={{
            name: 'font',
            type: 'select',
            defaultValue: site?.font!,
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
            defaultValue: site?.message404!,
            placeholder: "Oops! You've found a page that doesn't exist.",
            maxLength: 240,
          }}
          handleSubmit={updateSite}
        />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = "My Site's Appearance";
  const description =
    "Personalize your site's look with Appearance settings. Define your brand with custom visuals and make a lasting impression.";

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