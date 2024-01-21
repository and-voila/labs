import { relations } from 'drizzle-orm';
import { index, timestamp, varchar } from 'drizzle-orm/pg-core';

import { myPgTable } from './_table';
import { stripeCustomersTable } from './stripe-customers';
import { stripeSubscriptionStatusEnum } from './stripe-subscription-status-enum';
import { teamsTable } from './teams';

export const stripeSubscriptionsTable = myPgTable(
  'stripe_subscriptions',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    teamId: varchar('team_id', { length: 255 })
      .references(() => teamsTable.id)
      .notNull()
      .unique(),
    stripeCustomerId: varchar('stripe_customer_id', { length: 255 })
      .references(() => stripeCustomersTable.stripeCustomerId)
      .unique(),
    stripeSubscriptionId: varchar('stripe_subscription_id', {
      length: 255,
    }).unique(),
    status: stripeSubscriptionStatusEnum('status'),
    stripePriceId: varchar('stripe_price_id', {
      length: 255,
    }).unique(),
    stipreCurrentPeriodEnd: timestamp('stripe_current_period_end', {
      mode: 'date',
      precision: 3,
    }),

    created_at: timestamp('created_at', { mode: 'date', precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', {
      mode: 'date',
      precision: 3,
    }).defaultNow(),
  },
  (table) => {
    return {
      stripeSubscriptionTeamIdIdx: index('stripe_subscription_team_id_idx').on(
        table.teamId,
      ),
    };
  },
);

export const stripeSubscriptionsTableRelations = relations(
  stripeSubscriptionsTable,
  ({ one }) => ({
    team: one(teamsTable, {
      relationName: 'StripeSubscriptionToTeam',
      fields: [stripeSubscriptionsTable.teamId],
      references: [teamsTable.id],
    }),
  }),
);
