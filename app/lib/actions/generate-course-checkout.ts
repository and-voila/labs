'use server';

import { getServerSession } from 'next-auth';
import Stripe from 'stripe';

import { db } from '@/app/lib/db';
import { stripe } from '@/app/lib/stripe';

import { authOptions } from '../auth';

export type CheckoutResponse = {
  url: string;
};

export async function generateCourseCheckout(
  courseId: string,
): Promise<CheckoutResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user.email) {
      throw new Error('Unauthorized');
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: courseId,
        },
      },
    });

    if (purchase) {
      throw new Error('Already purchased');
    }

    if (!course) {
      throw new Error('Course not found');
    }

    // eslint-disable-next-line camelcase
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: course.title,
            description: course.preview!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: session.user.email,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: session.user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/learn/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/learn/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: session.user.id,
      },
    });

    if (!stripeSession.url) {
      throw new Error('Stripe session URL not found');
    }

    return { url: stripeSession.url };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error('Internal Error');
  }
}
