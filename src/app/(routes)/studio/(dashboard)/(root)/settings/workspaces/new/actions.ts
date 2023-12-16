'use server';

import { revalidatePath } from 'next/cache';
import { MembershipRole } from '@prisma/client';
import slugify from 'slugify';

import { APP_BP } from '#/lib/const';
import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

import { NewTeamFormValues } from './schema';

export const createTeam = async (data: NewTeamFormValues) => {
  'use server';

  const session = await getSession();
  if (!session) {
    return {
      error: 'You must be logged in to create a team',
      data: null,
    };
  }

  //console.log('Creating team with data:', data);
  const slug = slugify(data.name, {
    lower: true,
    strict: true,
  });
  //console.log('Generated slug:', slug);

  const team = await db.team.create({
    data: {
      name: data.name,
      slug,
      members: {
        create: {
          userId: session.user.id,
          role: MembershipRole.OWNER,
          accepted: true,
        },
      },
    },
  });

  revalidatePath(APP_BP);

  return {
    data: team,
  };
};

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

  if (!user || !user.displayName) {
    throw new Error('User not found or displayName is missing');
  }

  const teamSlug = user.name
    ? slugify(user.name, { lower: true, strict: true })
    : user.displayName;

  const team = await db.team.create({
    data: {
      name: user.name || user.displayName,
      slug: teamSlug,
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
