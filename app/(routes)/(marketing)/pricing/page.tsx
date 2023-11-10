import { PricingCards } from '@/app/components/pricing-cards';
import { PricingFaq } from '@/app/components/pricing-faq';
import { getCurrentUser } from '@/app/lib/session';
import { getUserSubscriptionPlan } from '@/app/lib/subscription';

export const metadata = {
  title: 'Pricing',
};

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
