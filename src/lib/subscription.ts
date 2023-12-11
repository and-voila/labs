import { pricingData } from '#/config/subscriptions';

import { db } from '#/lib/db';
import { stripe } from '#/lib/stripe';
import { UserSubscriptionPlan } from '#/lib/types';

const DAY_IN_MS = 86_400_000;

export async function getUserSubscriptionPlan(
  userId: string,
): Promise<UserSubscriptionPlan> {
  const stripeSubscription = await db.stripeSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!stripeSubscription) {
    const freePlan = pricingData.find((plan) => plan.title === 'Good');
    if (!freePlan) {
      throw new Error('Free plan not found in pricing data');
    }
    return {
      ...freePlan,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      stripePriceId: null,
      stripeCurrentPeriodEnd: null,
      isPaid: false,
      interval: null,
      isCanceled: false,
    };
  }

  const isPaid =
    stripeSubscription.stripePriceId &&
    stripeSubscription.stripeCurrentPeriodEnd &&
    stripeSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()
      ? true
      : false;

  const userPlan =
    pricingData.find(
      (plan) => plan.stripeIds.monthly === stripeSubscription.stripePriceId,
    ) ||
    pricingData.find(
      (plan) => plan.stripeIds.yearly === stripeSubscription.stripePriceId,
    );

  const plan = isPaid && userPlan ? userPlan : pricingData[0];

  const interval = isPaid
    ? userPlan?.stripeIds.monthly === stripeSubscription.stripePriceId
      ? 'month'
      : userPlan?.stripeIds.yearly === stripeSubscription.stripePriceId
        ? 'year'
        : null
    : null;

  let isCanceled = false;
  if (isPaid && stripeSubscription.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      stripeSubscription.stripeSubscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    ...stripeSubscription,
    stripeCurrentPeriodEnd: stripeSubscription.stripeCurrentPeriodEnd
      ? stripeSubscription.stripeCurrentPeriodEnd.getTime()
      : null,
    isPaid,
    interval,
    isCanceled,
  };
}
