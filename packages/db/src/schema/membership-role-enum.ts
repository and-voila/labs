import { pgEnum } from 'drizzle-orm/pg-core';

export const membershipRoleEnumTable = pgEnum('membership_roles_enum', [
  'member',
  'admin',
  'owner',
]);
