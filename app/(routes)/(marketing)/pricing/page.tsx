import { Metadata } from 'next';

import { PricingCards } from '@/app/components/pricing-cards';
import { PricingFaq } from '@/app/components/pricing-faq';
import { getCurrentUser } from '@/app/lib/session';
import { getUserSubscriptionPlan } from '@/app/lib/subscription';

export default async function PricingPage() {
  const user = await getCurrentUser();
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

  const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/pricing`
    : 'http://localhost:3001/pricing';

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
