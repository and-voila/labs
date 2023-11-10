'use client';

import { useState } from 'react';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { BillingFormButton } from '@/app/components/forms/billing-form-button';
import { Icons } from '@/app/components/shared/icons';
import { Button, buttonVariants } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { pricingData } from '@/app/config/subscriptions';
import { useSigninModal } from '@/app/hooks/use-signin-modal';
import { UserSubscriptionPlan } from '@/app/lib/types';

interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault = subscriptionPlan!.interval === 'year' ? true : false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);
  const signInModal = useSigninModal();

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section className="container flex flex-col items-center py-16 text-center lg:py-20">
      <div className="mx-auto mb-10 flex w-full flex-col gap-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Pricing
        </p>
        <h2 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-8xl">
          Start at full speed !
        </h2>
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
            <div className="min-h-[150px] items-start space-y-4 p-6">
              <p className="flex text-sm font-semibold uppercase tracking-widest text-brand">
                {offer.title}
              </p>

              <div className="flex flex-row">
                <div className="flex items-end">
                  <div className="flex text-left text-3xl font-semibold leading-6 lg:text-5xl">
                    {isYearly && offer.prices.monthly > 0 ? (
                      <>
                        <span className="mr-2 text-xl text-muted-foreground/70 line-through">
                          ${offer.prices.monthly}
                        </span>
                        <span>${Math.floor(offer.prices.yearly / 12)}</span>
                      </>
                    ) : (
                      `$${offer.prices.monthly}`
                    )}
                  </div>
                  <div className="-mb-1 ml-2 text-left text-sm font-medium">
                    <div>/mo</div>
                  </div>
                </div>
              </div>
              {offer.prices.monthly > 0 ? (
                <div className="text-left text-sm text-muted-foreground">
                  {isYearly
                    ? `You'll be billed $${offer.prices.yearly} now for the year.`
                    : 'billed monthly'}
                </div>
              ) : null}
            </div>

            <div className="flex h-full flex-col justify-between gap-16 p-6">
              <ul className="space-y-2 text-left text-sm font-medium leading-normal">
                {offer.benefits.map((feature) => (
                  <li className="flex items-start" key={feature}>
                    <Icons.check className="mr-3 h-5 w-5 shrink-0 text-brand/70" />
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
                <Button onClick={signInModal.onOpen}>Sign in</Button>
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