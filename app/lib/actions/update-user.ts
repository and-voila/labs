'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/lib/auth';
import { db } from '@/app/lib/db';
import { userNameSchema } from '@/app/lib/validations/user';

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

export type UserWorkspaceSlugFormData = {
  slug: string;
};

export async function updateUserWorkspaceSlug(
  userId: string,
  data: UserWorkspaceSlugFormData,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session?.user.id !== userId) {
      throw new Error('Unauthorized');
    }

    const { slug } = data;

    const team = await db.team.findFirst({
      where: {
        memberships: {
          some: {
            userId: userId,
            role: 'OWNER',
          },
        },
        isPrimary: true,
      },
    });

    if (!team) {
      throw new Error('Team not found');
    }

    await db.team.update({
      where: {
        id: team.id,
      },
      data: {
        slug: slug,
      },
    });

    revalidatePath('/dashboard/settings');
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
}
