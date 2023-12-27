'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { env } from 'env';

import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeamSubscriptionPlan } from '#/lib/operations/subsctiptions/subscription';
import { stripe } from '#/lib/stripe';

export type responseAction = {
  status: 'success' | 'error';
  stripeUrl?: string;
};

export async function generateUserStripe(
  priceId: string,
  teamId: string,
  teamSlug: string,
): Promise<responseAction> {
  let redirectUrl: string = '';

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user.email) {
      throw new Error('Unauthorized');
    }

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        teamId: teamId,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: {
          teamId: teamId,
        },
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          teamId: teamId,
          stripeCustomerId: customer.id,
        },
      });
    }

    const subscriptionPlan = await getTeamSubscriptionPlan(teamId);

    const billingUrl = `${SITE_URL}${APP_BP}/${teamSlug}/workspace/billing`;

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
          teamId: teamId,
        },
      });

      redirectUrl = stripeSession.url as string;
    }
  } catch (error) {
    throw new Error('Failed to generate user stripe session');
  }

  redirect(redirectUrl);
}
