'use client';

import { buttonVariants } from '#/components/ui/button';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className={buttonVariants({ size: 'sm', variant: 'secondary' })}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
