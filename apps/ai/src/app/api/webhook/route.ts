import { env } from '#/env';

import type Stripe from 'stripe';

import { headers } from 'next/headers';

import { db } from '#/lib/db';
import { stripe } from '#/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error: unknown) {
    const e = error as Error;
    return new Response(`❌ Webhook Error: ${e.message}`, { status: 400 });
  }

  if (
    ![
      'checkout.session.completed',
      'invoice.payment_succeeded',
      'customer.subscription.updated',
    ].includes(event.type)
  ) {
    // Added to silence Stripe staging webhook events that aren't subscribed to
    // eslint-disable-next-line no-console
    console.log(`⚠️ Received unhandled event type: ${event.type}`);
    return new Response(null, { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.teamId) {
    return new Response('❌ Team id is required', { status: 400 });
  }

  const teamId = session?.metadata?.teamId;

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await db.stripeSubscription.create({
      data: {
        teamId: teamId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await db.stripeSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }

  if (event.type === 'customer.subscription.updated') {
    try {
      const subscriptionId = event.data.object.id;

      if (!subscriptionId) {
        throw new Error('❌ Subscription ID is undefined');
      }

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      await db.stripeSubscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
      });
    } catch (error: unknown) {
      const e = error as Error;
      throw new Error(`❌Failed to update subscription: ${e.message}`);
    }
  }

  return new Response(null, { status: 200 });
}
