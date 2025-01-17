'use client';

import type { ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@av/ui/toaster';

import { ConfettiProvider } from '#/components/providers/confetti-provider';
import { ThemeProvider } from '#/components/providers/theme-provider';
import TopLoader from '#/components/providers/top-loader';
import { ModalProvider } from '#/components/publish/modal/provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider>
        <ModalProvider>
          <TopLoader />
          {children}
        </ModalProvider>
        <ConfettiProvider />
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}
