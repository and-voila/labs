'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import nProgress from 'nprogress';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { ConfettiProvider } from '@/app/components/providers/confetti-provider';
import { ThemeProvider } from '@/app/components/providers/theme-provider';
import { Toaster } from '@/app/components/ui/toaster';
import { ModalProvider } from '@/app/components/write/modal/provider';

export function Providers({ children }: { children: ReactNode }) {
  // TODO: Remove this upon next Next JS package update see: https://github.com/TheSGJ/nextjs-toploader/issues/56#issuecomment-1833133639
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    nProgress.done();
  }, [pathname, router]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider>
        <ModalProvider>
          <NextTopLoader
            color="#6032ec"
            initialPosition={0.08}
            crawlSpeed={20}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={20}
            shadow="0 0 10px #6032ec,0 0 5px #6032ec"
            zIndex={1600}
            showAtBottom={false}
          />
          {children}
        </ModalProvider>
      </SessionProvider>

      <ConfettiProvider />
      <Toaster />
      <BalancerProvider />
    </ThemeProvider>
  );
}
