import { UserSubscriptionPlan } from 'types';
import { pricingData } from '@/config/subscriptions';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';

const DAY_IN_MS = 86_400_000;

export async function getUserSubscriptionPlan(
  userId: string,
): Promise<UserSubscriptionPlan> {
  const userSubscription = await db.userSubscription.findUnique({
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

  if (!userSubscription) {
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

  // TODO: Fix null check
  const isPaid =
    userSubscription.stripePriceId &&
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
      ? true
      : false;

  const userPlan =
    pricingData.find(
      (plan) => plan.stripeIds.monthly === userSubscription.stripePriceId,
    ) ||
    pricingData.find(
      (plan) => plan.stripeIds.yearly === userSubscription.stripePriceId,
    );

  const plan = isPaid && userPlan ? userPlan : pricingData[0];

  const interval = isPaid
    ? userPlan?.stripeIds.monthly === userSubscription.stripePriceId
      ? 'month'
      : userPlan?.stripeIds.yearly === userSubscription.stripePriceId
      ? 'year'
      : null
    : null;

  let isCanceled = false;
  if (isPaid && userSubscription.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      userSubscription.stripeSubscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    ...userSubscription,
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    stripeCurrentPeriodEnd: userSubscription.stripeCurrentPeriodEnd?.getTime()!,
    isPaid,
    interval,
    isCanceled,
  };
}
