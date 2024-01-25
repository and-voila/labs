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
import { membershipsTable } from './memberships';
import { postsTable } from './posts';
import { sitesTable } from './sites';
import { stripeCustomersTable } from './stripe-customers';
import { stripeSubscriptionsTable } from './stripe-subscriptions';
import { teamInvitationsTable } from './team-invitations';

export const teamsTable = myPgTable(
  'teams',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    name: varchar('name', { length: 255 }).unique().notNull(),
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    image: text('image').default(
      'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/SgQEI5B-KRu6KULIVq8OXj0eKRn7drD4RRCGf1.png',
    ),
    imageBlurHash: text('image_blur_hash').default(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
    ),
    isPersonal: boolean('is_personal').notNull().default(false),
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
      teamTeamNameSlugUniqueIdx: uniqueIndex(
        'team_team_name_slug_unique_idx',
      ).on(table.name, table.slug),
      teamTeamSlugIdx: index('team_team_slug_idx').on(table.slug),
      teamTeamIdIdx: index('team_team_id_idx').on(table.id),
    };
  },
);

export const teamsTableRelations = relations(teamsTable, ({ one, many }) => ({
  members: many(membershipsTable, { relationName: 'MembershipToTeam' }),
  subscription: one(stripeSubscriptionsTable, {
    relationName: 'StripeSubscriptionToTeam',
    fields: [teamsTable.id],
    references: [stripeSubscriptionsTable.teamId],
  }),
  stripeCustomerId: one(stripeCustomersTable, {
    relationName: 'StripeCustomerToTeam',
    fields: [teamsTable.id],
    references: [stripeCustomersTable.teamId],
  }),
  invitations: many(teamInvitationsTable, {
    relationName: 'TeamToTeamInvitation',
  }),
  sites: many(sitesTable, { relationName: 'SiteToTeam' }),
  posts: many(postsTable, { relationName: 'PostToTeam' }),
}));

export type Team = typeof teamsTable.$inferSelect;
export type NewTeam = typeof teamsTable.$inferInsert;
