import { SiteFooter } from '@/app/components/layout/site-footer';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-full flex-col bg-background dark:bg-[#242629]">
      <main className="flex-1 items-center justify-center">{children}</main>
      <SiteFooter />
    </div>
  );
}
