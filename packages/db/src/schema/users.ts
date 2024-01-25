import { relations } from 'drizzle-orm';
import { index, text, timestamp } from 'drizzle-orm/pg-core';

import { myPgTable } from './_table';
import { accountsTable } from './accounts';
import { adminsTable } from './admins';
import { membershipsTable } from './memberships';
import { postsTable } from './posts';
import { sessionsTable } from './sessions';
import { sitesTable } from './sites';
import { teamInvitationsTable } from './team-invitations';

export const usersTable = myPgTable(
  'users',
  {
    id: text('id').primaryKey(),
    name: text('name'),
    displayName: text('dislpay_name').unique(),
    username: text('username'),
    email: text('email').notNull().unique(),
    emailVerified: timestamp('emailVerified', { mode: 'date', precision: 3 }),
    image: text('image'),

    created_at: timestamp('created_at', { mode: 'date', precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', precision: 3 })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      userUserEmailIdx: index('user_user_email_idx').on(table.email),
      userUserIdIdx: index('user_user_id_idx').on(table.id),
    };
  },
);

export const usersTableRelations = relations(usersTable, ({ one, many }) => ({
  teams: many(membershipsTable, { relationName: 'MembershipToUser' }),
  accounts: many(accountsTable, { relationName: 'AccountToUser' }),
  sessions: many(sessionsTable, { relationName: 'AccountToUser' }),
  sites: many(sitesTable, { relationName: 'SiteToUser' }),
  posts: many(postsTable, { relationName: 'PostToUser' }),
  invitations: many(teamInvitationsTable, {
    relationName: 'TeamInvitationToUser',
  }),
  admin: one(adminsTable, {
    relationName: 'AdminToUser',
    fields: [usersTable.id],
    references: [adminsTable.userId],
  }),
}));

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
