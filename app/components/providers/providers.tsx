'use client';

import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { Analytics } from '@/app/components/providers/analytics';
import { ConfettiProvider } from '@/app/components/providers/confetti-provider';
import { ModalProvider } from '@/app/components/providers/modal-provider';
import { SessionInfo } from '@/app/components/providers/session-info';
import { Toaster } from '@/app/components/ui/toaster';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Analytics />
      <ModalProvider />
      <ConfettiProvider />
      <Toaster />
      <SessionInfo />
      <BalancerProvider />
    </NextThemesProvider>
  );
}
