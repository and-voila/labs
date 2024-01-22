'use client';

import type { ReactNode } from 'react';

import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { ConfettiProvider } from '#/components/providers/confetti-provider';
import { ThemeProvider } from '#/components/providers/theme-provider';
import TopLoader from '#/components/providers/top-loader';
import { ModalProvider } from '#/components/publish/modal/provider';
import { Toaster } from '#/components/ui/toaster';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ModalProvider>
        <TopLoader />
        {children}
      </ModalProvider>

      <ConfettiProvider />
      <Toaster />
      <BalancerProvider />
    </ThemeProvider>
  );
}
