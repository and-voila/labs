import Link from 'next/link';

import { cn } from '@av/ui';
import { buttonVariants } from '@av/ui/button';

const MarketingIndexHero = (): JSX.Element => {
  return (
    <section className="space-y-6 py-24 md:py-32 lg:py-48">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <div className="text-sm font-semibold uppercase tracking-widest text-primary">
          Get Early Access
        </div>
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-8xl">
          Discover the alchemy of digital marketing
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Real-time guidance, micro courses, and AI-powered tools await. No
          fluff, just actionable insights that drive results.
        </p>

        <div className="space-x-4">
          <Link href="/register" className={cn(buttonVariants())}>
            Get Started
          </Link>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          No credit card required
        </p>
      </div>
    </section>
  );
};

export default MarketingIndexHero;
