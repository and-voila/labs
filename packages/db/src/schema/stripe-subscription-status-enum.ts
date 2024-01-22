import { pgEnum } from 'drizzle-orm/pg-core';

export const stripeSubscriptionStatusEnum = pgEnum(
  'stripe_subscriptions_status_enum',
  [
    'active',
    'canceled',
    'expired',
    'incomplete',
    'past_due',
    'paused',
    'trialing',
    'unpaid',
  ],
);
