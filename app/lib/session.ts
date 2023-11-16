import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/lib/auth';

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
    };
  } | null>;
}
