'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

import { Icons } from '@/app/components/shared/icons';
import { Modal } from '@/app/components/shared/modal';
import { Button } from '@/app/components/ui/button';
import { siteConfig } from '@/app/config/site';
import { useSigninModal } from '@/app/hooks/use-signin-modal';

export const SignInModal = () => {
  const signInModal = useSigninModal();
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-primary-foreground px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Icons.logo className="h-10 w-10" />
          </a>
          <h3 className="text-2xl font-bold">Log in or Create Account</h3>
          <p className="text-sm text-muted-foreground">
            No credit card required. Start off with the free,{' '}
            <span className="font-semibold text-brand"> Good plan</span>. If you
            need more, upgrade.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <Button
            variant="custom"
            disabled={signInClicked}
            onClick={() => {
              setSignInClicked(true);
              signIn('google', { redirect: false }).then(() =>
                // TODO: fix this without setTimeOut(), modal closes too quickly. Idea: update value before redirect
                setTimeout(() => {
                  signInModal.onClose();
                }, 1000),
              );
            }}
          >
            {signInClicked ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{' '}
            Sign In with Google
          </Button>
        </div>
      </div>
    </Modal>
  );
};
