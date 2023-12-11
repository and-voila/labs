import MarketingIndexBenefits from '#/components/marketing/marketing-index-benefits';
import MarketingIndexHero from '#/components/marketing/marketing-index-hero';
import MarketingIndexOpenSource from '#/components/marketing/marketing-index-open-source';
import { siteConfig } from '#/config/site';
import { Metadata } from 'next';

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

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}`;

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
