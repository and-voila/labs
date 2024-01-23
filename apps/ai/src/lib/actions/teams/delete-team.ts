'use server';

import { revalidatePath } from 'next/cache';
import { MembershipRole } from '@prisma/client';

import { APP_BP } from '#/lib/const';
import { db } from '#/lib/db';
import { getSession } from '#/lib/operations/user/session';

export const deleteTeam = async (teamSlug: string) => {
  const session = await getSession();
  if (!session)
    return {
      status: 'KO',
      error: 'You must be logged in to delete a team.',
    };

  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
  });

  if (!team) {
    return {
      status: 'KO',
      error: 'Team not found.',
    };
  }

  await db.team.delete({
    where: {
      id: team.id,
      members: {
        some: {
          userId: session.user.id,
          accepted: true,
          role: {
            in: [MembershipRole.ADMIN, MembershipRole.OWNER],
          },
        },
      },
    },
  });

  revalidatePath(APP_BP);

  return {
    status: 'OK',
  };
};
