import { Metadata } from 'next';

import MarketingIndexBenefits from '@/app/components/marketing/marketing-index-benefits';
import MarketingIndexHero from '@/app/components/marketing/marketing-index-hero';
import MarketingIndexOpenSource from '@/app/components/marketing/marketing-index-open-source';
import { siteConfig } from '@/app/config/site';

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

  const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3001';

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: '/open-graph.gif',
          width: 1200,
          height: 630,
          alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
        },
      ],
      url,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: '/open-graph.gif',
          width: 1200,
          height: 630,
          alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
        },
      ],
    },
  };

  return metadata;
}
