'use client';

import type { TeamSubscriptionPlan } from '#/lib/types';

import { useCallback, useState } from 'react';

import { cn } from '@av/ui';
import { Switch } from '@av/ui/switch';

import { pricingData } from '#/config/subscriptions';

import PricingCard from '#/components/marketing/pricing-card';

interface PricingCardsProps {
  teamId?: string;
  subscriptionPlan?: TeamSubscriptionPlan;
  isPublic?: boolean;
  teamSlug?: string;
}

export function PricingCards({
  teamId,
  subscriptionPlan,
  isPublic,
  teamSlug,
}: PricingCardsProps) {
  const [isYearly, setIsYearly] = useState(
    subscriptionPlan?.interval === 'year',
  );

  const toggleBilling = useCallback(() => {
    setIsYearly((prevIsYearly) => !prevIsYearly);
  }, []);

  return (
    <section
      className={cn(
        'container flex flex-col items-center text-center lg:px-8',
        { 'py-16 lg:py-20': isPublic },
      )}
    >
      {isPublic && (
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
      )}

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

      <div
        className={cn(
          'isolate mx-auto grid max-w-lg grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3',
          { 'mt-10': isPublic },
        )}
      >
        {pricingData.map((offer) => (
          <PricingCard
            key={offer.title}
            plan={offer}
            isYearly={isYearly}
            teamId={teamId}
            subscriptionPlan={subscriptionPlan}
            teamSlug={teamSlug}
            isPublic={isPublic}
          />
        ))}
      </div>

      <p className="mt-6 text-balance text-center text-base text-muted-foreground">
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
      </p>
    </section>
  );
}
