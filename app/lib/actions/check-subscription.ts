'use server';

import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';
import { isTeacher } from '@/app/lib/teacher';

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (): Promise<boolean> => {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return false;
  }

  if (isTeacher(userId)) {
    return true;
  }

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
