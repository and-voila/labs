import Link from 'next/link';

import { SubscriptionPlan, UserSubscriptionPlan } from '#/lib/types';
import { cn } from '#/lib/utils';

import { BillingFormButton } from '#/components/forms/billing-form-button';
import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';

interface PricingCardProps {
  plan: SubscriptionPlan;
  isYearly: boolean;
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

const PricingCard = ({
  plan,
  isYearly,
  userId,
  subscriptionPlan,
}: PricingCardProps) => {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-xl border bg-card p-6 shadow"
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
            <span className="text-sm leading-6 text-muted-foreground">
              /month{isYearly ? ', billed yearly' : ''}
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
              <Icons.radixCheck className="mr-3 h-5 w-5 shrink-0 text-primary/70" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
        {userId && subscriptionPlan ? (
          <BillingFormButton
            year={isYearly}
            offer={plan}
            subscriptionPlan={subscriptionPlan}
          />
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
