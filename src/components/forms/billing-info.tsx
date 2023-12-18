'use client';

import * as React from 'react';
import Link from 'next/link';

import { APP_BP } from '#/lib/const';
import { TeamSubscriptionPlan } from '#/lib/types';
import { cn, formatDate } from '#/lib/utils';

import { buttonVariants } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: TeamSubscriptionPlan;
  teamName: string;
  teamSlug: string;
}

export function BillingInfo({
  subscriptionPlan,
  teamName,
  teamSlug,
}: BillingInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{teamName} billing plan</CardTitle>
        <CardDescription>
          Your workspace for{' '}
          <span className="font-semibold text-alternate">{teamName}</span> is on
          the{' '}
          <span className="text-primary">
            <strong>{subscriptionPlan.title}</strong>
          </span>{' '}
          plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        {subscriptionPlan.description}
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
        <Link
          href={`${APP_BP}/${teamSlug}/workspace/billing`}
          className={cn(
            buttonVariants({
              size: 'sm',
              variant: subscriptionPlan.isPaid ? 'secondary' : 'default',
            }),
          )}
        >
          {subscriptionPlan.isPaid ? 'Manage Subscription' : 'Upgrade now'}
        </Link>

        {subscriptionPlan.isPaid ? (
          <p className="rounded-full text-sm">
            {subscriptionPlan.isCanceled
              ? 'Your plan will be canceled on '
              : 'Your plan renews on '}
            <span className="font-bold text-primary">
              {subscriptionPlan.stripeCurrentPeriodEnd
                ? formatDate(subscriptionPlan.stripeCurrentPeriodEnd)
                : 'N/A'}
            </span>
            .
          </p>
        ) : null}
      </CardFooter>
    </Card>
  );
}
