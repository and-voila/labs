'use client';

import { useState } from 'react';
import Balancer from 'react-wrap-balancer';

import { pricingData } from '#/config/subscriptions';

import { UserSubscriptionPlan } from '#/lib/types';
import { getPlanByTitle } from '#/lib/utils';

import GoodPlanCard from '#/components/good-plan-card';
import PricingCard from '#/components/pricing-card';
import { Switch } from '#/components/ui/switch';

interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const [isYearly, setIsYearly] = useState(
    subscriptionPlan?.interval === 'year',
  );

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  const goodPlan = getPlanByTitle('Good');

  return (
    <section className="container flex flex-col items-center py-16 text-center lg:px-8 lg:py-20">
      <div className="mx-auto mb-10 max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
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
        {pricingData
          .filter((offer) => offer.title !== 'Good')
          .map((offer) => (
            <PricingCard
              key={offer.title}
              plan={offer}
              isYearly={isYearly}
              userId={userId}
              subscriptionPlan={subscriptionPlan}
            />
          ))}
      </div>
      {goodPlan && <GoodPlanCard plan={goodPlan} userId={userId} />}

      <p className="mt-6 text-center text-base text-muted-foreground">
        <Balancer>
          Reach out to our{' '}
          <a
            className="font-medium text-primary hover:underline"
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
