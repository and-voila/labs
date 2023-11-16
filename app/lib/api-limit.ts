import { MAX_FREE_TOKENS } from '@/constants';

import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';

export const increaseApiLimit = async () => {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await db.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await db.userApiLimit.create({
      data: {
        userId: userId,
        count: 1,
      },
    });
  }
};

export const checkApiLimit = async () => {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return false;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_TOKENS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return 0;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};
