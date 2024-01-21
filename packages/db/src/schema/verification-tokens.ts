import { primaryKey, text, timestamp } from 'drizzle-orm/pg-core';

import { myPgTable } from './_table';

export const verificationTokensTable = myPgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
