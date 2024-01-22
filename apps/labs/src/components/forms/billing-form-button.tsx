import type { SubscriptionPlan, TeamSubscriptionPlan } from '#/lib/types';

import { useCallback, useTransition } from 'react';
import Link from 'next/link';

import { generateUserStripe } from '#/lib/actions/stripe/generate-user-stripe';

import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: TeamSubscriptionPlan;
  year: boolean;
  teamId: string;
  teamSlug: string;
}

export function BillingFormButton({
  year,
  offer,
  subscriptionPlan,
  teamId,
  teamSlug,
}: BillingFormButtonProps) {
  const [isPending, startTransition] = useTransition();

  const stripeSessionAction = useCallback(() => {
    startTransition(async () => {
      if (!teamId || !teamSlug) {
        return;
      }

      await generateUserStripe(
        offer.stripeIds[year ? 'yearly' : 'monthly'] ?? 'monthly',
        teamId,
        teamSlug,
      );
    });
  }, [startTransition, teamId, teamSlug, offer.stripeIds, year]);

  return (
    <div>
      {teamId && teamSlug ? (
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
                : subscriptionPlan.stripePriceId
                  ? 'Switch Plan'
                  : 'Upgrade'}
            </>
          )}
        </Button>
      ) : (
        <Link
          href={`/register?from=${encodeURIComponent('/pricing')}`}
          passHref
        >
          <Button variant="default" className="w-full">
            Create an Account
          </Button>
        </Link>
      )}
    </div>
  );
}
