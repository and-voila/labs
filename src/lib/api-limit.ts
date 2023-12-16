import { MAX_FREE_TOKENS } from '#/lib/const';
import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

export const increaseApiLimit = async () => {
  const session = await getSession();

  if (!session?.user?.id) {
    return;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (userApiLimit) {
    await db.userApiLimit.update({
      where: { userId: session.user.id },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await db.userApiLimit.create({
      data: {
        userId: session.user.id,
        count: 1,
      },
    });
  }
};

export const checkApiLimit = async () => {
  const session = await getSession();

  if (!session?.user?.id) {
    return false;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId: session.user.id,
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

  if (!session?.user?.id) {
    return 0;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};
