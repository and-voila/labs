import { useTransition } from 'react';

import { generateUserStripe } from '#/lib/actions/generate-user-stripe';
import { SubscriptionPlan, UserSubscriptionPlan } from '#/lib/types';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';

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
    startTransition(async () => {
      await generateUserStripeSession();
      return;
    });

  return (
    <Button
      variant={
        subscriptionPlan.stripePriceId ===
        offer.stripeIds[year ? 'yearly' : 'monthly']
          ? 'secondary'
          : 'default'
      }
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
