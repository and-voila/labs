'use client';

import { useCallback } from 'react';
import { signOut } from 'next-auth/react';

import { buttonVariants } from '@and-voila/ui/button';

const SignOutButton = () => {
  const handleSignOut = useCallback(() => {
    void signOut({ callbackUrl: '/login' });
  }, []);

  return (
    <button
      onClick={handleSignOut}
      className={buttonVariants({ size: 'sm', variant: 'secondary' })}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
