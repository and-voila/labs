import { ReactNode } from 'react';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { ThemeProvider } from '#/components/providers/theme-provider';
import { Toaster } from '#/components/ui/toaster';
import { ModalProvider } from '#/components/write/modal/provider';

import TopLoader from './top-loader';

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
