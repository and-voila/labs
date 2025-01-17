'use server';

import { env } from '#/env';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { APP_BP } from '@av/utils';

import { authOptions } from '#/lib/auth';
import { SITE_URL } from '#/lib/const';
import { getTeamSubscriptionPlan } from '#/lib/operations/subsctiptions/subscription';
import { stripe } from '#/lib/stripe';

export interface responseAction {
  status: 'success' | 'error';
  stripeUrl?: string;
}

export async function generateUserStripe(
  priceId: string,
  teamId: string,
  teamSlug: string,
): Promise<responseAction> {
  let redirectUrl = '';

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user.email) {
      throw new Error('Unauthorized');
    }

    const billingUrl = `${SITE_URL}${APP_BP}/${teamSlug}/workspace/billing`;

    const subscriptionPlan = await getTeamSubscriptionPlan(teamId);

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url;
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
          teamId: teamId,
        },
        subscription_data: {
          metadata: {
            teamId: teamId,
          },
        },
      });

      redirectUrl = stripeSession.url!;
    }
  } catch (error) {
    throw new Error('Failed to generate user stripe session');
  }

  redirect(redirectUrl);
}
