import { relations } from 'drizzle-orm';
import { index, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { myPgTable } from './_table';
import { postsTable } from './posts';
import { teamsTable } from './teams';
import { usersTable } from './users';

export const sitesTable = myPgTable(
  'sites',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
    logo: text('logo').default(
      'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/SgQEI5B-KRu6KULIVq8OXj0eKRn7drD4RRCGf1.png',
    ),
    image: text('image').default(
      'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/qbRcbkW-GSx1IuBuKyVEbOJkFlkxBCVaCy5qfD.jpeg',
    ),
    imageBlurHash: text('image_blur_hash').default(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
    ),
    subdomain: varchar('subdomain', { length: 255 }).unique(),
    customDomain: varchar('custom_domain', { length: 255 }).unique(),
    font: varchar('font', { length: 255 }).default('font-cal'),
    message404: text('message_404').default(
      'Oops! You found a page that does not exist.',
    ),
    teamId: varchar('team_id', { length: 255 })
      .references(() => teamsTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    userId: varchar('user_id', { length: 255 }).references(
      () => usersTable.id,
      {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    ),

    created_at: timestamp('created_at', { mode: 'date', precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', precision: 3 })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      siteUserIdIdx: index('site_user_id_idx').on(table.userId),
      siteTeamIdIdx: index('site_team_id_idx').on(table.teamId),
    };
  },
);

export const sitesTableRelations = relations(sitesTable, ({ one, many }) => ({
  team: one(teamsTable, {
    relationName: 'SiteToTeam',
    fields: [sitesTable.teamId],
    references: [teamsTable.id],
  }),
  user: one(usersTable, {
    relationName: 'SiteToUser',
    fields: [sitesTable.userId],
    references: [usersTable.id],
  }),
  posts: many(postsTable, { relationName: 'PostToSite' }),
}));
