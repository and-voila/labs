import { relations } from 'drizzle-orm';
import { timestamp, varchar } from 'drizzle-orm/pg-core';

import { myPgTable } from './_table';
import { teamsTable } from './teams';
import { usersTable } from './users';

export const stripeCustomersTable = myPgTable('stripe_customer', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 })
    .references(() => usersTable.id)
    .unique(),
  teamId: varchar('team_id', { length: 255 })
    .references(() => teamsTable.id)
    .notNull()
    .unique(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }).unique(),
  created_at: timestamp('created_at', { mode: 'date', precision: 3 })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', {
    mode: 'date',
    precision: 3,
  }).defaultNow(),
});

export const stripeCustomersTableRelations = relations(
  stripeCustomersTable,
  ({ one }) => ({
    team: one(teamsTable, {
      relationName: 'StripeCustomerToTeam',
      fields: [stripeCustomersTable.teamId],
      references: [teamsTable.id],
    }),
  }),
);

export type StripeCustomer = typeof stripeCustomersTable.$inferSelect;
export type NewStripeCustomer = typeof stripeCustomersTable.$inferInsert;
