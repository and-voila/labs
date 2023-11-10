import { useState } from 'react';
import axios from 'axios';

import { Icons } from '@/app/components/shared/icons';
import { Button } from '@/app/components/ui/button';
import { SubscriptionPlan, UserSubscriptionPlan } from '@/app/lib/types';

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
  const [isLoading, setLoading] = useState(false);

  const stripeSessionAction = async () => {
    setLoading(true);
    try {
      const stripePriceId = offer.stripeIds[year ? 'yearly' : 'monthly'];
      if (!stripePriceId) {
        throw new Error('Stripe price ID not found');
      }
      const response = await axios.get('/api/stripe', {
        params: { priceId: stripePriceId },
      });
      window.location.href = response.data.url;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="custom"
      className="w-full"
      disabled={isLoading}
      onClick={stripeSessionAction}
    >
      {isLoading ? (
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
