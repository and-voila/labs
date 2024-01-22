import { getServerSession } from 'next-auth/next';

import { authOptions } from '#/lib/auth';

export function getSession() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
      displayName: string;
    };
  } | null>;
}
