'use client';

import * as React from 'react';
import Link from 'next/link';

import { buttonVariants } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { UserSubscriptionPlan } from '@/app/lib/types';
import { cn, formatDate } from '@/app/lib/utils';

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan;
}

export function BillingInfo({ subscriptionPlan }: BillingInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership Plan</CardTitle>
        <CardDescription>
          You are currently on the{' '}
          <span className="text-brand">
            <strong>{subscriptionPlan.title}</strong>
          </span>{' '}
          plan.
        </CardDescription>
      </CardHeader>
      <CardContent>{subscriptionPlan.description}</CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
        <Link
          href="/pricing"
          className={cn(
            buttonVariants({
              size: 'sm',
              variant: subscriptionPlan.isPaid ? 'secondary' : 'custom',
            }),
          )}
        >
          {subscriptionPlan.isPaid ? 'Manage Subscription' : 'Upgrade now'}
        </Link>

        {subscriptionPlan.isPaid ? (
          <p className="rounded-full text-xs font-medium">
            {subscriptionPlan.isCanceled
              ? 'Your plan will be canceled on '
              : 'Your plan renews on '}
            {subscriptionPlan.stripeCurrentPeriodEnd
              ? formatDate(subscriptionPlan.stripeCurrentPeriodEnd)
              : 'N/A'}
            .
          </p>
        ) : null}
      </CardFooter>
    </Card>
  );
}
