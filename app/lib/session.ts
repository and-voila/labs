import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/lib/auth';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
