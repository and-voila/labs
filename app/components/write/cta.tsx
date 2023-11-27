import Link from 'next/link';

import { Logo } from '@/app/components/logo-square';
import { buttonVariants } from '@/app/components/ui/button';
import { cn } from '@/app/lib/utils';

interface WriteCtaProps {
  domain: string;
}

const WriteCta = ({ domain }: WriteCtaProps) => {
  return (
    <div className="rounded-lg border bg-card shadow">
      <div className="px-4 py-4 sm:px-4 sm:py-4 lg:p-6">
        <div className="mx-auto max-w-lg text-center">
          <Logo fillOnHover className="mx-auto my-2 h-6 w-auto" />
          <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">
            Start your free blog today
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-8 text-muted-foreground">
            Create your own website in 3 minutes. Bring a domain or use ours. No
            coding or credit card required.
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-4">
            <Link
              href={`https://labs.andvoila.gg/register?utm_source=${domain}`}
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              Get started
            </Link>
            <Link
              href={`https://labs.andvoila.gg?utm_source=${domain}`}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteCta;
