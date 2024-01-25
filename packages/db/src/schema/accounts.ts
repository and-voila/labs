import { relations } from 'drizzle-orm';
import { integer, primaryKey, text } from 'drizzle-orm/pg-core';

import { myPgTable } from './_table';
import { usersTable } from './users';

export const accountsTable = myPgTable(
  'accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    type: text('type').$type<'oauth' | 'oidc' | 'email'>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const accountsTableRelations = relations(accountsTable, ({ one }) => ({
  user: one(usersTable, {
    relationName: 'AccountToUser',
    fields: [accountsTable.userId],
    references: [usersTable.id],
  }),
}));

export type Account = typeof accountsTable.$inferSelect;
export type NewAccount = typeof accountsTable.$inferInsert;
