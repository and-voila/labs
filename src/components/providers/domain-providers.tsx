import { ReactNode } from 'react';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { ThemeProvider } from '#/components/providers/theme-provider';
import TopLoader from '#/components/providers/top-loader';
import { Toaster } from '#/components/ui/toaster';
import { ModalProvider } from '#/components/write/modal/provider';

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
