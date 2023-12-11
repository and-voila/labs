'use server';

import { db } from '#/lib/db';
import { userNameSchema } from '#/lib/validations/user';

import { revalidatePath } from 'next/cache';

import { InternalServerError, UnauthorizedError } from '#/lib/error-code';
import { getSession } from '#/lib/session';
import { displayNameSchema } from '#/lib/validations/display-name';

export type FormData = {
  name: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const session = await getSession();

    if (!session?.user || session?.user.id !== userId) {
      throw new Error('Unauthorized');
    }

    const { name } = userNameSchema.parse(data);

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    });

    revalidatePath('/dashboard/settings');
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
}

export type DisplayNameFormData = {
  displayName: string;
};

export async function updateDisplayName(
  userId: string,
  data: DisplayNameFormData,
) {
  try {
    const session = await getSession();

    if (!session?.user || session?.user.id !== userId) {
      throw new Error('Unauthorized');
    }

    const { displayName } = displayNameSchema.parse(data);

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        displayName: displayName,
      },
    });

    revalidatePath('/dashboard/settings');
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
}

export type UserImageFormData = {
  imageUrl: string;
};

export async function updateUserImage(userId: string, data: UserImageFormData) {
  try {
    const session = await getSession();

    if (!session?.user || session?.user.id !== userId) {
      throw new Error('Unauthorized');
    }

    const { imageUrl } = data;

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        image: imageUrl,
      },
    });

    revalidatePath('/dashboard/settings');
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
}

export const updateLocalizations = async (locale: string, timeZone: string) => {
  const session = await getSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  try {
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        timeZone,
        locale,
      },
    });

    revalidatePath('/');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    throw new InternalServerError('Something went wrong');
  }
};

export const deletePersonalAccount = async () => {
  const session = await getSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  try {
    await db.user.delete({
      where: {
        id: session.user.id,
      },
    });
  } catch {
    throw new InternalServerError('Something went wrong');
  }
};

export const updateTheme = async (theme: string) => {
  const session = await getSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      theme,
    },
  });

  revalidatePath('/');

  return;
};
