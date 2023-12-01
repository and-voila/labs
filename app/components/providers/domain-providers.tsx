'use client';

import { ReactNode } from 'react';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { ThemeProvider } from '@/app/components/providers/theme-provider';
import { Toaster } from '@/app/components/ui/toaster';
import { ModalProvider } from '@/app/components/write/modal/provider';

export function DomainProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ModalProvider>{children}</ModalProvider>
      <Toaster />
      <BalancerProvider />
    </ThemeProvider>
  );
}
