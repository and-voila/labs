// :: Authentication Module Types ::

import type { DefaultSession, User as NextAuthUser } from 'next-auth';

import 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
  }
}

interface User extends NextAuthUser {
  displayName?: string;
  username?: string;
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId;
    } & DefaultSession['user'];
  }
}
