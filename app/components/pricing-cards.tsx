'use client';

import { useState } from 'react';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { BillingFormButton } from '@/app/components/forms/billing-form-button';
import { Icons } from '@/app/components/shared/icons';
import { buttonVariants } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { pricingData } from '@/app/config/subscriptions';
import { UserSubscriptionPlan } from '@/app/lib/types';

import { cn } from '../lib/utils';

interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault = subscriptionPlan?.interval === 'year' ? true : false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section className="container flex flex-col items-center py-16 text-center lg:py-20">
      <div className="mx-auto mb-10 max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Membership Plans
        </p>
        <h2 className="mt-2 text-7xl font-bold tracking-tight">
          Crush your marketing goals
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Propel your digital marketing journey with Early Access. Dive into a
          world of cutting-edge Playbooks, AI-enhanced tools, and a vibrant
          community that’s always one step ahead.
        </p>
      </div>

      <div className="mb-4 flex items-center gap-5">
        <span>Monthly Billing</span>
        <Switch
          checked={isYearly}
          onCheckedChange={toggleBilling}
          role="switch"
          aria-label="switch-year"
        />
        <span>Annual Billing</span>
      </div>

      <div className="mx-auto grid max-w-screen-lg gap-5 bg-inherit py-5 md:grid-cols-3 lg:grid-cols-3">
        {pricingData.map((offer) => (
          <div
            className="relative flex flex-col overflow-hidden rounded-xl border bg-card"
            key={offer.title}
          >
            <div className="min-h-[120px] items-start space-y-4 p-6">
              <p className="flex text-sm font-semibold uppercase tracking-widest text-brand">
                {offer.title}
              </p>
              <div className="mt-6 flex items-baseline gap-x-1">
                <span className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
                  {isYearly && offer.prices.monthly > 0 ? (
                    <>
                      <span>${Math.floor(offer.prices.yearly / 12)}</span>
                    </>
                  ) : offer.prices.monthly > 0 ? (
                    `$${offer.prices.monthly}`
                  ) : (
                    'Free'
                  )}
                </span>
                {offer.prices.monthly > 0 && (
                  <span className="text-sm leading-6 text-muted-foreground">
                    /month{isYearly ? ', billed yearly' : ''}
                  </span>
                )}
              </div>
            </div>
            <div className="flex h-full flex-col justify-between gap-16 p-6">
              <ul className="space-y-2 text-left text-sm font-medium leading-normal">
                {offer.benefits.map((feature) => (
                  <li className="flex items-start" key={feature}>
                    <Icons.radixCheck className="mr-3 h-5 w-5 shrink-0 text-brand/70" />
                    <p>{feature}</p>
                  </li>
                ))}

                {offer.limitations.length > 0 &&
                  offer.limitations.map((feature) => (
                    <li
                      className="flex items-start text-muted-foreground"
                      key={feature}
                    >
                      <Icons.crossLarge className="mr-3 h-5 w-5 shrink-0" />
                      <p>{feature}</p>
                    </li>
                  ))}
              </ul>

              {userId && subscriptionPlan ? (
                offer.title === 'Good' ? (
                  <Link
                    href="/dashboard"
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
                    offer={offer}
                    subscriptionPlan={subscriptionPlan}
                  />
                )
              ) : (
                <Link
                  href={`/register?from=${encodeURIComponent('/pricing')}`}
                  passHref
                  className={cn(buttonVariants({ variant: 'custom' }))}
                >
                  Create an Account
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-base text-muted-foreground">
        <Balancer>
          Reach out to our{' '}
          <a
            className="font-medium text-brand hover:underline"
            href="mailto:yo@andvoila.gg"
          >
            Support Team
          </a>{' '}
          if you have any questions.
          <br />
          <strong>Backed by our 100% Delight Guarantee. Cancel anytime.</strong>
        </Balancer>
      </p>
    </section>
  );
}
