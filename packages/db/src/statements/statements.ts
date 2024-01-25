import { eq, sql } from 'drizzle-orm';

import { db } from '..';
import { usersTable } from '../schema/users';

export const psGetUserByEmail = db
  .select()
  .from(usersTable)
  .where(eq(usersTable.email, sql.placeholder('email')))
  .prepare('psGetUserByEmail');
