'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/lib/auth';
import { db } from '@/app/lib/db';
import { userNameSchema } from '@/app/lib/validations/user';

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
