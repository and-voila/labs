import '@av/ui/styles/globals.css';

import type { Viewport } from 'next';

import { fontBricolage } from 'public/fonts';

import { cn } from '@av/ui';

import { DomainProviders } from '#/components/providers/domain-providers';

interface DomainRootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fb' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
};

export default function DomainRootLayout({ children }: DomainRootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${fontBricolage.variable} text-base antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className={cn('min-h-screen bg-background')}>
        <DomainProviders>{children}</DomainProviders>
      </body>
    </html>
  );
}
