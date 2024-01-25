import { relations } from 'drizzle-orm';
import { index, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

import { myPgTable } from './_table';
import { membershipRoleEnumTable } from './membership-role-enum';
import { teamsTable } from './teams';
import { usersTable } from './users';

export const teamInvitationsTable = myPgTable(
  'team_invitations',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }),
    teamId: varchar('team_id', { length: 255 })
      .references(() => teamsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    teamSlug: varchar('team_slug', { length: 255 }).notNull(),
    invitedBy: varchar('invited_by', { length: 255 })
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    token: varchar('token', { length: 255 }).unique().notNull(),
    expires: timestamp('expires', { mode: 'date', precision: 3 }).notNull(),
    role: membershipRoleEnumTable('role').default('member').notNull(),

    created_at: timestamp('created_at', { mode: 'date', precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', precision: 3 })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      invitesTeamIdemailUniqueIdx: uniqueIndex('invites_team_id_email_idx').on(
        table.teamId,
        table.email,
      ),
      initesTeamIdIdx: index('invites_team_id_idx').on(table.teamId),
    };
  },
);

export const teamInvitationsTableRelations = relations(
  teamInvitationsTable,
  ({ one }) => ({
    team: one(teamsTable, {
      relationName: 'TeamToTeamInvitation',
      fields: [teamInvitationsTable.teamId],
      references: [teamsTable.id],
    }),
    user: one(usersTable, {
      relationName: 'TeamInvitationToUser',
      fields: [teamInvitationsTable.invitedBy],
      references: [usersTable.id],
    }),
  }),
);

export type TeamInvitation = typeof teamInvitationsTable.$inferSelect;
export type NewTeamInvitation = typeof teamInvitationsTable.$inferInsert;
