'use client';

import { useTransition } from 'react';
import { generateUserStripe } from '@/actions/generate-user-stripe';
import { SubscriptionPlan, UserSubscriptionPlan } from '@/types';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: UserSubscriptionPlan;
  year: boolean;
}

export function BillingFormButton({
  year,
  offer,
  subscriptionPlan,
}: BillingFormButtonProps) {
  const [isPending, startTransition] = useTransition();
  const generateUserStripeSession = generateUserStripe.bind(
    null,
    offer.stripeIds[year ? 'yearly' : 'monthly'] || '',
  );

  const stripeSessionAction = () =>
    startTransition(
      async () => await generateUserStripeSession().then(() => undefined),
    );

  return (
    <Button
      variant="default"
      className="w-full"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Loading...
        </>
      ) : (
        <>
          {subscriptionPlan.stripePriceId ===
          offer.stripeIds[year ? 'yearly' : 'monthly']
            ? 'Manage Subscription'
            : 'Upgrade'}
        </>
      )}
    </Button>
  );
}
