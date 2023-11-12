'use client';

import { useEffect, useState } from 'react';

import { SignInModal } from '@/app/components/layout/sign-in-modal';
import { ProModal } from '@/app/components/modals/pro-modal';

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ProModal />
      <SignInModal />
    </>
  );
};
