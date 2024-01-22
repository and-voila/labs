import { MembershipRole } from '@prisma/client';

import { db } from '#/lib/db';
import { UnauthorizedError } from '#/lib/helpers/error-code';

export const hasTeamAccess = async (userId: string, teamSlug: string) => {
  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
  });

  if (!team) {
    return false;
  }

  const membership = await db.membership.findUnique({
    where: {
      userId_teamId: {
        teamId: team.id,
        userId: userId,
      },
      accepted: true,
    },
  });

  if (team.isPersonal) {
    return true;
  }

  if (membership) {
    return true;
  }

  return false;
};

export const isAdminOrOwner = async (userId: string, teamSlug: string) => {
  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
  });

  if (!team) {
    throw new UnauthorizedError();
  }
  const membership = await db.membership.findUnique({
    where: {
      userId_teamId: {
        teamId: team.id,
        userId: userId,
      },
      accepted: true,
    },
  });

  if (
    membership &&
    (membership.role === MembershipRole.ADMIN ||
      membership.role === MembershipRole.OWNER)
  ) {
    return true;
  }

  return false;
};

export const hasTeamAuthority = async (userId: string, teamSlug: string) => {
  const hasAccess = await hasTeamAccess(userId, teamSlug);
  if (!hasAccess) {
    throw new UnauthorizedError();
  }

  const isAdminOrOwnerAccess = await isAdminOrOwner(userId, teamSlug);
  if (!isAdminOrOwnerAccess) {
    return false;
  }

  return true;
};
