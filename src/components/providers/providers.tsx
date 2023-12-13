'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { ConfettiProvider } from '#/components/providers/confetti-provider';
import { ThemeProvider } from '#/components/providers/theme-provider';
import { Toaster } from '#/components/ui/toaster';
import { ModalProvider } from '#/components/write/modal/provider';

import TopLoader from './top-loader';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider>
        <ModalProvider>
          <TopLoader />
          {children}
        </ModalProvider>
      </SessionProvider>

      <ConfettiProvider />
      <Toaster />
      <BalancerProvider />
    </ThemeProvider>
  );
}
