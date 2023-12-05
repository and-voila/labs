// :: Authentication Module Types ::

import { User as NextAuthUser } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
  }
}

interface User extends NextAuthUser {
  displayName?: string;
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId;
    };
  }
}
