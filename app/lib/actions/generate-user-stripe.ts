'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { env } from '@/env.mjs';
import { authOptions } from '@/app/lib/auth';
import { stripe } from '@/app/lib/stripe';
import { getUserSubscriptionPlan } from '@/app/lib/subscription';
import { absoluteUrl } from '@/app/lib/utils';

export type responseAction = {
  status: 'success' | 'error';
  stripeUrl?: string;
};

const billingUrl = absoluteUrl('/pricing');

export async function generateUserStripe(
  priceId: string,
): Promise<responseAction> {
  let redirectUrl: string = '';

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user.email) {
      throw new Error('Unauthorized');
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id);

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
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

      redirectUrl = stripeSession.url as string;
    }
  } catch (error) {
    throw new Error('Failed to generate user stripe session');
  }

  redirect(redirectUrl);
}
