'use client';

import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { ConfettiProvider } from '@/app/components/providers/confetti-provider';
import { SessionInfo } from '@/app/components/providers/session-info';
import { Toaster } from '@/app/components/ui/toaster';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}

      <ConfettiProvider />
      <Toaster />
      <SessionInfo />
      <BalancerProvider />
    </NextThemesProvider>
  );
}
