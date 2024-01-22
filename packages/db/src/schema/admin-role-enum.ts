import { pgEnum } from 'drizzle-orm/pg-core';

export const adminRoleEnumTable = pgEnum('admin_roles_enum', [
  'admin',
  'superadmin',
]);
