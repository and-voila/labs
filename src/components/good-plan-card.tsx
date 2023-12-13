import Link from 'next/link';

import { pricingData } from '#/config/subscriptions';

import { CP_PREFIX } from '#/lib/const';
import { SubscriptionPlan } from '#/lib/types';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';

interface GoodPlanCardProps {
  plan: SubscriptionPlan;
  userId?: string;
}

const goodPlan = pricingData.find((plan) => plan.title === 'Good');

const GoodPlanCard = ({ plan, userId }: GoodPlanCardProps) => {
  return (
    <div className="mx-2 mt-10 max-w-xs rounded-3xl bg-card ring-1 ring-border sm:mt-20 md:mx-auto md:max-w-screen-lg lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 sm:p-10 lg:flex-row">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-start text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
              Free is {plan.title}
            </h3>
            <p className="mt-1 max-w-2xl text-start text-base leading-7 text-muted-foreground">
              {plan.description}
            </p>
          </div>
          <div className="ml-4 mt-4 w-full flex-shrink-0 sm:w-auto">
            {userId ? (
              <Link
                href={`${CP_PREFIX}/billing`}
                className={buttonVariants({
                  className: 'w-full sm:w-auto',
                  variant: 'secondary',
                  size: 'lg',
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
        </div>
        <div className="mt-10 flex items-center gap-x-4">
          <h4 className="flex-none text-sm font-semibold uppercase tracking-widest text-primary">
            What&apos;s included
          </h4>
          <div className="h-px flex-auto bg-border" />
        </div>
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-4 text-start text-sm leading-6 text-muted-foreground sm:grid-cols-2 sm:gap-6 md:text-base"
        >
          {goodPlan?.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-x-3">
              <Icons.radixCheck
                className="h-6 w-5 flex-none text-primary"
                aria-hidden="true"
              />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GoodPlanCard;
