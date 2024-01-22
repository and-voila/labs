import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as accounts from './schema/accounts';
import * as adminRoleEnum from './schema/admin-role-enum';
import * as admins from './schema/admins';
import * as membershipRoleEnum from './schema/membership-role-enum';
import * as memberships from './schema/memberships';
import * as posts from './schema/posts';
import * as sessions from './schema/sessions';
import * as sites from './schema/sites';
import * as stripeCustomers from './schema/stripe-customers';
import * as stripeSubscriptionStatusEnum from './schema/stripe-subscription-status-enum';
import * as stripeSubscriptions from './schema/stripe-subscriptions';
import * as teamInvitations from './schema/team-invitations';
import * as teams from './schema/teams';
import * as users from './schema/users';
import * as verificationTokens from './schema/verification-tokens';

export const schema = {
  ...accounts,
  ...adminRoleEnum,
  ...admins,
  ...membershipRoleEnum,
  ...memberships,
  ...posts,
  ...sessions,
  ...sites,
  ...stripeCustomers,
  ...stripeSubscriptionStatusEnum,
  ...stripeSubscriptions,
  ...teamInvitations,
  ...teams,
  ...users,
  ...verificationTokens,
};

export { myPgTable as tableCreator } from './schema/_table';

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
