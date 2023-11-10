'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

import { ConfettiProvider } from '@/app/components/providers/confetti-provider';
import { ModalProvider } from '@/app/components/providers/modal-provider';
import { SessionInfo } from '@/app/components/session-info';
import { TailwindIndicator } from '@/app/components/tailwind-indicator';
import { Toaster } from '@/app/components/ui/toaster';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ModalProvider />
      <ConfettiProvider />
      <Toaster />
      <SessionInfo />
      <TailwindIndicator />
      {children}
    </ThemeProvider>
  );
}
