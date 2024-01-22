/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { updateSite } from '#/lib/actions/publish/publish-actions';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';

import { DashboardHeader } from '#/components/dashboard/header';
import Form from '#/components/publish/form';

export default async function SiteIdSettings({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const site = await db.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  if (!site) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        title={`Settings for ${site?.name}`}
        description="Refine your site title and description to improve SEO."
      />
      <div className="my-8 grid max-w-3xl gap-8 md:my-12">
        <Form
          title="Name"
          description="The name of your site. This will be used as the meta title on Google as well."
          helpText="For optimal results, we recommend a 32 character limit."
          inputAttrs={{
            name: 'name',
            type: 'text',
            defaultValue: site?.name!,
            placeholder: 'My Awesome Site',
            maxLength: 32,
          }}
          handleSubmit={updateSite}
        />
        <Form
          title="Description"
          description="The description of your site. This will be used as the meta description on Google as well."
          helpText="Create an SEO description with keywords. We suggest a length of 140-159 characters."
          inputAttrs={{
            name: 'description',
            type: 'text',
            defaultValue: site?.description!,
            placeholder: 'A blog about really interesting things.',
          }}
          handleSubmit={updateSite}
        />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = "My Site's Settings";
  const description =
    "Navigate your site's Settings with ease. Customize, control, and create a site that truly reflects your brand's unique identity.";

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
