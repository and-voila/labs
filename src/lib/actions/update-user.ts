'use server';

import { authOptions } from '#/lib/auth';
import { db } from '#/lib/db';
import { userNameSchema } from '#/lib/validations/user';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { displayNameSchema } from '../validations/display-name';

export type FormData = {
  name: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const session = await getServerSession(authOptions);

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
    const session = await getServerSession(authOptions);

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
    const session = await getServerSession(authOptions);

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
