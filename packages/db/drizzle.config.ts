import type { Config } from 'drizzle-kit';

import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

if (!process.env.DREON_DIRECT_URL) {
  throw new Error('Drizzle Config Error: DREON_DIRECT_URL is not defined.`');
}

export default {
  schema: './src/schema',
  out: './src/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DREON_DIRECT_URL,
  },
  tablesFilter: ['av_*'],
} satisfies Config;
