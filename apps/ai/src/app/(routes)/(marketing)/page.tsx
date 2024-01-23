import type { Metadata } from 'next';

import { siteConfig } from '#/config/site';

import { SITE_URL } from '#/lib/const';

import MarketingIndexBenefits from '#/components/marketing/marketing-index-benefits';
import MarketingIndexHero from '#/components/marketing/marketing-index-hero';
import MarketingIndexOpenSource from '#/components/marketing/marketing-index-open-source';

export default async function IndexPage() {
  return (
    <>
      <MarketingIndexHero />
      <MarketingIndexBenefits />
      <MarketingIndexOpenSource />
    </>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Gain Marketing Superpowers';
  const description = siteConfig.description;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}`;

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
