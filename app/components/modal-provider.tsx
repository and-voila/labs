'use client';

import { SignInModal } from '@/app/components/layout/sign-in-modal';
import { useMounted } from '@/app/hooks/use-mounted';

export const ModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SignInModal />
      {/* add your own modals here... */}
    </>
  );
};
