import { relations } from 'drizzle-orm';
import { index, timestamp, varchar } from 'drizzle-orm/pg-core';

import { myPgTable } from './_table';
import { adminRoleEnumTable } from './admin-role-enum';
import { usersTable } from './users';

export const adminsTable = myPgTable(
  'admins',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    userId: varchar('user_id', { length: 255 })
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    role: adminRoleEnumTable('role').notNull(),

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
      adminUserIdIdx: index('admin_user_id_idx').on(table.userId),
    };
  },
);

export const adminsTableRelations = relations(adminsTable, ({ one }) => ({
  user: one(usersTable, {
    relationName: 'AdminToUser',
    fields: [adminsTable.userId],
    references: [usersTable.id],
  }),
}));

export type Admin = typeof adminsTable.$inferSelect;
export type NewAdmin = typeof adminsTable.$inferInsert;
