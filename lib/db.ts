import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

import { env } from '@/env.mjs';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Instantiate libSQL
const libsql = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

// Instantiate the libSQL driver adapter
const adapter = new PrismaLibSQL(libsql);

// Pass the adapter option to the Prisma Client instance
const prisma = globalThis.prisma || new PrismaClient({ adapter });

export const db = prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
