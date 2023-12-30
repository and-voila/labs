/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { updateSite } from '#/lib/actions/publish/publish-actions';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';

import { DashboardHeader } from '#/components/dashboard/header';
import Form from '#/components/publish/form';

export default async function SiteIdDomains({
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
        title={`Domain settings for ${site?.name}`}
        description="Add a custom domain or update your subdomain. No code required."
      />
      <div className="my-8 grid max-w-3xl gap-8 md:my-12">
        <Form
          title="Subdomain"
          description="Update the subdomain for your site."
          helpText="Up to 32 characters. Think twice about changes, as this will affect your site's SEO."
          inputAttrs={{
            name: 'subdomain',
            type: 'text',
            defaultValue: site?.subdomain!,
            placeholder: 'subdomain',
            maxLength: 32,
          }}
          handleSubmit={updateSite}
        />
        <Form
          title="Custom Domain"
          description="Bring your own domain in under 60 seconds."
          helpText="Please enter a valid domain you own and follow the on-screen set-up wizard."
          inputAttrs={{
            name: 'customDomain',
            type: 'text',
            defaultValue: site?.customDomain!,
            placeholder: 'yourdomain.com',
            maxLength: 64,
            pattern: '^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$',
          }}
          handleSubmit={updateSite}
        />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = "My Site's Domains";
  const description =
    'Take charge of your online identity with our Domain settings. Choose a custom domain for your site and establish your unique digital presence.';

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
