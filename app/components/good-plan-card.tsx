import Link from 'next/link';

import { buttonVariants } from '@/app/components/ui/button';
import { SubscriptionPlan } from '@/app/lib/types';
import { cn } from '@/app/lib/utils';

interface GoodPlanCardProps {
  plan: SubscriptionPlan;
  userId?: string;
}

const GoodPlanCard = ({ plan, userId }: GoodPlanCardProps) => {
  return (
    <div className="mx-2 mt-10 flex max-w-3xl flex-col items-start gap-x-8 gap-y-6 rounded-3xl border bg-card p-8 shadow sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
      <div className="lg:min-w-0 lg:flex-1">
        <h3 className="text-start text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
          Free is {plan.title}
        </h3>
        <p className="mt-1 text-start text-base leading-7 text-muted-foreground">
          {plan.description}
        </p>
      </div>
      {userId ? (
        <Link
          href="/dashboard"
          className={buttonVariants({
            className: 'w-full sm:w-auto',
            variant: 'secondary',
          })}
        >
          Go to dashboard
        </Link>
      ) : (
        <Link
          href={`/register?from=${encodeURIComponent('/pricing')}`}
          passHref
          className={cn(
            buttonVariants({
              className: 'w-full sm:w-auto',
            }),
          )}
        >
          Create an Account
        </Link>
      )}
    </div>
  );
};

export default GoodPlanCard;
