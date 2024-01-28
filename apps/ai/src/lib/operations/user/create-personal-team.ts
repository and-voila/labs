import { MembershipRole } from '@prisma/client';
import slugify from 'slugify';

import { db } from '#/lib/db';

import { createImage } from './update-new-user';

export const createPersonalTeam = async (userId: string) => {
  const existingPersonalTeam = await db.team.findFirst({
    where: {
      members: {
        some: {
          userId: userId,
          role: MembershipRole.OWNER,
        },
      },
      isPersonal: true,
    },
  });

  if (existingPersonalTeam) {
    return { team: existingPersonalTeam, isNew: false };
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user?.displayName) {
    throw new Error('User not found or displayName is missing');
  }

  const teamImageUrl = createImage(userId, 'team');

  const teamSlug = user.name
    ? slugify(user.name, { lower: true, strict: true })
    : user.displayName;

  const team = await db.team.create({
    data: {
      name: user.displayName ?? user.name,
      slug: teamSlug,
      image: teamImageUrl,
      isPersonal: true,
      members: {
        create: {
          userId: user.id,
          role: MembershipRole.OWNER,
          accepted: true,
        },
      },
    },
  });

  return { team, isNew: true };
};
