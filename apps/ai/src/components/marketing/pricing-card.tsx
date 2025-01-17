import type { SubscriptionPlan, TeamSubscriptionPlan } from '#/lib/types';

import Link from 'next/link';

import { cn } from '@av/ui';
import { Button, buttonVariants } from '@av/ui/button';
import { Icons } from '@av/ui/icons';
import { APP_BP } from '@av/utils';

import { BillingFormButton } from '#/components/forms/billing-form-button';

interface PricingCardProps {
  plan: SubscriptionPlan;
  isYearly: boolean;
  teamId?: string;
  subscriptionPlan?: TeamSubscriptionPlan;
  teamSlug?: string;
  isPublic?: boolean;
}

const PricingCard = ({
  plan,
  isYearly,
  teamId,
  subscriptionPlan,
  teamSlug,
  isPublic,
}: PricingCardProps) => {
  return (
    <div
      className="relative flex min-w-[340px] flex-col overflow-hidden rounded-xl border bg-card p-6 shadow"
      key={plan.title}
    >
      <div className="min-h-[120px] items-start space-y-4 ">
        <p className="flex text-sm font-semibold uppercase tracking-widest text-primary">
          {plan.title}
        </p>
        <div className="mt-6 flex items-baseline gap-x-1">
          <span className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            {isYearly && plan.prices.monthly > 0 ? (
              <>
                <span>${Math.floor(plan.prices.yearly / 12)}</span>
              </>
            ) : plan.prices.monthly > 0 ? (
              `$${plan.prices.monthly}`
            ) : (
              'Free'
            )}
          </span>
          {plan.prices.monthly > 0 && (
            <span className="text-xs leading-6 text-muted-foreground">
              /month, per user{isYearly ? ', billed yearly' : ''}
            </span>
          )}
        </div>
      </div>
      <div className="flex h-full flex-col justify-between gap-12">
        <ul className="space-y-1 text-left text-sm font-medium leading-normal">
          {plan.benefits.map((feature) => (
            <li
              className="flex items-start text-muted-foreground"
              key={feature}
            >
              <Icons.check className="mr-3 h-5 w-5 shrink-0 text-alternate/70" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
        {!isPublic && teamId && teamSlug && subscriptionPlan ? (
          plan.title === 'Good' ? (
            <Button className="pointer-events-none w-full" variant="secondary">
              Current plan
            </Button>
          ) : (
            <BillingFormButton
              year={isYearly}
              offer={plan}
              subscriptionPlan={subscriptionPlan}
              teamId={teamId}
              teamSlug={teamSlug}
            />
          )
        ) : isPublic && teamId && teamSlug && subscriptionPlan ? (
          plan.title === 'Good' ? (
            <Link
              href={`${APP_BP}/${teamSlug}/workspace/billing`}
              className={buttonVariants({
                className: 'w-full',
                variant: 'secondary',
              })}
            >
              Go to dashboard
            </Link>
          ) : (
            <BillingFormButton
              year={isYearly}
              offer={plan}
              subscriptionPlan={subscriptionPlan}
              teamId={teamId}
              teamSlug={teamSlug}
            />
          )
        ) : (
          <Link
            href={`/register?from=${encodeURIComponent('/pricing')}`}
            passHref
            className={cn(buttonVariants())}
          >
            Create an Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
