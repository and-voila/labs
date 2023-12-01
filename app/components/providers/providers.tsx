'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { ConfettiProvider } from '@/app/components/providers/confetti-provider';
import { Toaster } from '@/app/components/ui/toaster';
import { ModalProvider } from '@/app/components/write/modal/provider';

import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider>
        <ModalProvider>{children}</ModalProvider>
      </SessionProvider>

      <ConfettiProvider />
      <Toaster />
      <BalancerProvider />
    </ThemeProvider>
  );
}
