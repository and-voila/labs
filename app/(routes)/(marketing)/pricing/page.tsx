import { Metadata } from 'next';

import { PricingCards } from '@/app/components/pricing-cards';
import { PricingFaq } from '@/app/components/pricing-faq';
import { getSession } from '@/app/lib/session';
import { getUserSubscriptionPlan } from '@/app/lib/subscription';

export default async function PricingPage() {
  const session = await getSession();
  const user = session?.user || null;

  let subscriptionPlan;

  if (user) {
    subscriptionPlan = await getUserSubscriptionPlan(user.id);
  }

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards userId={user?.id} subscriptionPlan={subscriptionPlan} />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Pricing';
  const description =
    "Get started free, no credit card required. Access our playbooks, check out our AI tools, and browse the community. When you're ready, upgrade your membership.";

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/pricing`;

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
