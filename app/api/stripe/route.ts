// TODO: Add state to URL

import { parse } from 'url';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { env } from '@/env.mjs';
import { authOptions } from '@/app/lib/auth';
import { db } from '@/app/lib/db';
import { stripe } from '@/app/lib/stripe';
import { absoluteUrl } from '@/app/lib/utils';

const settingsUrl = absoluteUrl('/pricing');

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const parsedUrl = parse(req.url, true);
    const queryParams = new URLSearchParams(
      parsedUrl.query as Record<string, string>,
    );
    const priceId = queryParams.get('priceId');
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!priceId) {
      return new NextResponse('Price ID is required', { status: 400 });
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      discounts: [
        {
          coupon: env.STRIPE_COUPON_ID,
        },
      ],
      billing_address_collection: 'auto',
      customer_email: session.user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
