import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as accountsTable from './schema/accounts';
import * as adminRoleEnumTable from './schema/admin-role-enum';
import * as adminsTable from './schema/admins';
import * as membershipRoleEnumTable from './schema/membership-role-enum';
import * as membershipsTable from './schema/memberships';
import * as postsTable from './schema/posts';
import * as sessionsTable from './schema/sessions';
import * as sitesTable from './schema/sites';
import * as stripeCustomersTable from './schema/stripe-customers';
import * as stripeSubscriptionStatusEnumTable from './schema/stripe-subscription-status-enum';
import * as stripeSubscriptionsTable from './schema/stripe-subscriptions';
import * as teamInvitationsTable from './schema/team-invitations';
import * as teamsTable from './schema/teams';
import * as usersTable from './schema/users';
import * as verificationTokensTable from './schema/verification-tokens';

export const schema = {
  ...accountsTable,
  ...adminRoleEnumTable,
  ...adminsTable,
  ...membershipRoleEnumTable,
  ...membershipsTable,
  ...postsTable,
  ...sessionsTable,
  ...sitesTable,
  ...stripeCustomersTable,
  ...stripeSubscriptionStatusEnumTable,
  ...stripeSubscriptionsTable,
  ...teamInvitationsTable,
  ...teamsTable,
  ...usersTable,
  ...verificationTokensTable,
};

export { myPgTable as tableCreator } from './schema/_table';
export * from './statements/statements';
export * from 'drizzle-orm';
export type { PgTableFn } from 'drizzle-orm/pg-core';

if (!process.env.DREON_DIRECT_URL) {
  throw new Error(
    'Drizzle intialization error: DREON_DIRECT_URL environment variable is not set',
  );
}

neonConfig.fetchConnectionCache = true;

export const db = drizzle(
  neon(process.env.DREON_DIRECT_URL, {
    fetchOptions: {
      cache: 'no-store',
    },
  }),
  { schema },
);
