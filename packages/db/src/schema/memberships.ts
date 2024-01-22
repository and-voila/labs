import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

import { myPgTable } from './_table';
import { membershipRoleEnumTable } from './membership-role-enum';
import { teamsTable } from './teams';
import { usersTable } from './users';

export const membershipsTable = myPgTable(
  'memberships',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    role: membershipRoleEnumTable('role').default('member').notNull(),
    accepted: boolean('accepted').notNull().default(false),
    teamId: varchar('team_id', { length: 255 })
      .references(() => teamsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    userId: varchar('user_id', { length: 255 })
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),

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
      membershipUserIdteamIdUniqueIdx: uniqueIndex(
        'membership_user_id_site_id_idx',
      ).on(table.userId, table.teamId),
      membershipTeamIdIdx: index('membership_team_id_idx').on(table.teamId),
      membershipUserIdIdx: index('membership_user_id_idx').on(table.userId),
    };
  },
);

export const membershipsTableRelations = relations(
  membershipsTable,
  ({ one }) => ({
    team: one(teamsTable, {
      relationName: 'MembershipToTeam',
      fields: [membershipsTable.teamId],
      references: [teamsTable.id],
    }),
    user: one(usersTable, {
      relationName: 'MembershipToUser',
      fields: [membershipsTable.userId],
      references: [usersTable.id],
    }),
  }),
);
