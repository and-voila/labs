import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { env } from ':/env.mjs';

import { db } from '#/lib/db';
import { stripe } from '#/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET!,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (
    !['checkout.session.completed', 'invoice.payment_succeeded'].includes(
      event.type,
    )
  ) {
    // Added to silence Stripe staging webhook events that aren't subscribed to
    // eslint-disable-next-line no-console
    console.log(`Received unhandled event type: ${event.type}`);
    return new NextResponse(null, { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.teamId) {
    return new NextResponse('Team id is required', { status: 400 });
  }

  const teamId = session?.metadata?.teamId;

  if (event.type === 'checkout.session.completed') {
    if (session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      if (!teamId) {
        return new NextResponse('Team id is required', { status: 400 });
      }

      const team = await db.team.findUnique({ where: { id: teamId } });
      if (!team) {
        return new NextResponse('Team not found', { status: 400 });
      }

      await db.stripeSubscription.create({
        data: {
          teamId: teamId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
      });
    }
  } else if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    const stripeSubscription = await db.stripeSubscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (!stripeSubscription) {
      await db.stripeSubscription.create({
        data: {
          teamId: session?.metadata?.teamId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
      });
    } else {
      await db.stripeSubscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
      });
    }
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 },
    );
  }

  return new NextResponse(null, { status: 200 });
}
