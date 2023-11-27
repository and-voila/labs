'use client';

import { ReactNode } from 'react';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { Toaster } from '@/app/components/ui/toaster';
import { ModalProvider } from '@/app/components/write/modal/provider';

import { ThemeProvider } from './theme-provider';

export function DomainProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ModalProvider>{children}</ModalProvider>
      <Toaster />
      <BalancerProvider />
    </ThemeProvider>
  );
}
