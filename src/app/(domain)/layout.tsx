import '#/styles/globals.css';

import { DomainProviders } from '#/components/providers/domain-providers';
import { cn } from '#/lib/utils';
import { fontBricolage } from ':/public/fonts';
import { Viewport } from 'next';

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
