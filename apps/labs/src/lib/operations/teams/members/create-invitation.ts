import type { MembershipRole } from '@prisma/client';

import { db } from '#/lib/db';
import { generateId } from '#/lib/helpers/id-helper';

/**
 * Creates a new team invitation.
 */
export const createInvitation = async (params: {
  teamSlug: string;
  invitedBy: string;
  email: string;
  role?: MembershipRole;
}) => {
  const { teamSlug, invitedBy, email, role } = params;
  const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000); // 7 days

  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
  });

  if (!team) {
    throw new Error('Team not found');
  }

  return await db.teamInvitation.create({
    data: {
      teamSlug: team.slug,
      teamId: team.id,
      email: email.toLowerCase(),
      role: role,
      expires,
      invitedById: invitedBy,
      token: generateId('inv'),
    },
  });
};

/**
 * Creates multiple team invitations in bulk.
 */
export const createManyInvitations = async (params: {
  teamSlug: string;
  invitedBy: string;
  emails: string[];
  role?: MembershipRole;
}) => {
  const { teamSlug, invitedBy, emails, role } = params;
  const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000); // 7 days

  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
  });

  if (!team) {
    throw new Error('Team not found');
  }

  const pairs = emails.map((email) => ({
    email: email.toLowerCase(),
    token: generateId('inv'),
  }));

  const result = await db.teamInvitation.createMany({
    data: pairs.map((pair) => ({
      teamSlug: team.slug,
      teamId: team.id,
      email: pair.email,
      role: role,
      expires,
      invitedById: invitedBy,
      token: pair.token,
    })),
  });

  return {
    count: result.count,
    pairs,
  };
};
