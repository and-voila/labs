'use server';

import type { NewTeamFormValues } from '#/lib/validations/new-team';

import { revalidatePath } from 'next/cache';
import { MembershipRole } from '@prisma/client';
import slugify from 'slugify';

import { APP_BP } from '@av/utils';

import { db } from '#/lib/db';
import { getSession } from '#/lib/operations/user/session';
import { createImage } from '#/lib/operations/user/update-new-user';

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

  const teamImageUrl = createImage(session.user.id, 'team');

  const team = await db.team.create({
    data: {
      name: data.name,
      slug,
      image: teamImageUrl,
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
