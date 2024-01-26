import type { ReactNode } from 'react';

import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { Toaster } from '@av/ui/toaster';

import { ThemeProvider } from '#/components/providers/theme-provider';
import TopLoader from '#/components/providers/top-loader';
import { ModalProvider } from '#/components/publish/modal/provider';

export function DomainProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ModalProvider>
        <TopLoader />
        {children}
      </ModalProvider>
      <Toaster />
      <BalancerProvider />
    </ThemeProvider>
  );
}
