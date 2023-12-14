'use client';

import { signOut } from 'next-auth/react';

import { buttonVariants } from '#/components/ui/button';

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
