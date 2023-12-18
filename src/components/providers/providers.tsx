'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { ActiveTeamSlugProvider } from '#/components/providers/active-team-slug-provider';
import { ConfettiProvider } from '#/components/providers/confetti-provider';
import { ThemeProvider } from '#/components/providers/theme-provider';
import TopLoader from '#/components/providers/top-loader';
import { ModalProvider } from '#/components/publish/modal/provider';
import { Toaster } from '#/components/ui/toaster';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ActiveTeamSlugProvider>
        <SessionProvider>
          <ModalProvider>
            <TopLoader />
            {children}
          </ModalProvider>
        </SessionProvider>
      </ActiveTeamSlugProvider>

      <ConfettiProvider />
      <Toaster />
      <BalancerProvider />
    </ThemeProvider>
  );
}
