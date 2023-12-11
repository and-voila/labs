import '#/styles/globals.css';

import { Viewport } from 'next';
import { fontBricolage } from ':/public/fonts';

import { cn } from '#/lib/utils';
import { DomainProviders } from '#/components/providers/domain-providers';

interface DomainRootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#edf1f2' },
    { media: '(prefers-color-scheme: dark)', color: '#010101' },
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
