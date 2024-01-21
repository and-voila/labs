import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

import { myPgTable } from './_table';
import { sitesTable } from './sites';
import { teamsTable } from './teams';
import { usersTable } from './users';

export const postsTable = myPgTable(
  'posts',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
    content: text('content'),
    slug: varchar('slug', { length: 255 }).notNull(),
    image: text('image').default(
      'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/IoGBwOC-9CvtiYRSGCNZAuY0UAemMZ0UzFtuZ7.jpeg',
    ),
    imageBlurHash: text('image_blur_hash').default(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
    ),
    published: boolean('published').notNull().default(false),
    userId: varchar('user_id', { length: 255 })
      .references(() => usersTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    teamId: varchar('team_id', { length: 255 }).references(
      () => teamsTable.id,
      {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    ),
    siteId: varchar('site_id', { length: 255 })
      .references(() => sitesTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    created_at: timestamp('created_at', { mode: 'date', precision: 3 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', precision: 3 })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      postSlugSiteIdUniqueIdx: uniqueIndex('post_slug_site_id_idx').on(
        table.slug,
        table.siteId,
      ),
      postUserIdIdx: index('post_user_id_idx').on(table.userId),
      postSiteIdIdx: index('post_site_id_idx').on(table.siteId),
    };
  },
);

export const postsTableRelations = relations(postsTable, ({ one }) => ({
  team: one(teamsTable, {
    relationName: 'PostToTeam',
    fields: [postsTable.teamId],
    references: [teamsTable.id],
  }),
  user: one(usersTable, {
    relationName: 'PostToUser',
    fields: [postsTable.userId],
    references: [usersTable.id],
  }),
  site: one(sitesTable, {
    relationName: 'PostToSite',
    fields: [postsTable.siteId],
    references: [sitesTable.id],
  }),
}));
