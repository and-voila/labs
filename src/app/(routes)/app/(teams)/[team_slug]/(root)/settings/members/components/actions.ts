'use server';

import { revalidatePath } from 'next/cache';
import { MembershipRole } from '@prisma/client';

import { CP_PREFIX } from '#/lib/const';
import { db } from '#/lib/db';
import { UnauthorizedError } from '#/lib/error-code';
import { getSession } from '#/lib/session';

export const deleteInviteAction = async (inviteId: string) => {
  const session = await getSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  await db.teamInvitation.delete({
    where: {
      id: inviteId,
      team: {
        members: {
          some: {
            userId: session.user.id,
            role: {
              in: [MembershipRole.ADMIN, MembershipRole.OWNER],
            },
          },
        },
      },
    },
  });

  revalidatePath('/');
  return {
    status: 'OK',
    message: 'Invitation deleted successfully',
  };
};

export const deleteMemberAction = async (memberId: string) => {
  const session = await getSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  await db.membership.delete({
    where: {
      id: memberId,
      team: {
        members: {
          some: {
            userId: session.user.id,
            role: {
              in: [MembershipRole.ADMIN, MembershipRole.OWNER],
            },
          },
        },
      },
    },
  });

  revalidatePath('/');
  return {
    status: 'OK',
    message: 'Member deleted successfully',
  };
};

export const changeRoleAction = async (
  memberId: string,
  teamSlug: string,
  role: MembershipRole,
) => {
  const session = await getSession();

  if (!session) {
    return {
      status: 'KO',
      message: 'Unauthorized',
    };
  }

  const team = await db.team.findUnique({
    where: {
      slug: teamSlug,
    },
  });

  if (!team) {
    return {
      status: 'KO',
      message: 'Team not found',
    };
  }

  const currentMembership = await db.membership.findUnique({
    where: {
      userId_teamId: {
        userId: session.user.id,
        teamId: team.id,
      },
    },
    include: {
      team: {
        select: {
          members: true,
        },
      },
    },
  });

  if (!currentMembership) {
    return {
      status: 'KO',
      message: 'Unauthorized',
    };
  }

  const currentUserRole = currentMembership.role;

  const userIsAdmin =
    currentUserRole === MembershipRole.ADMIN ||
    currentUserRole === MembershipRole.OWNER;
  const userIsChangingOwnRole = memberId === currentMembership.id;

  const userCanChangeRole =
    userIsAdmin &&
    (role === MembershipRole.MEMBER ||
      role === MembershipRole.ADMIN ||
      role === MembershipRole.OWNER);

  if (!userCanChangeRole && !userIsChangingOwnRole) {
    // console.log('why', userIsAdmin, userIsChangingOwnRole, userCanChangeRole);
    return {
      status: 'KO',
      message: 'Unauthorized',
    };
  }

  if (userIsChangingOwnRole && currentUserRole === MembershipRole.OWNER) {
    const ownersCount = currentMembership.team.members.filter(
      (member) => member.role === MembershipRole.OWNER,
    ).length;

    if (ownersCount === 1) {
      return {
        status: 'KO',
        message: 'Cannot change role of last owner',
      };
    }
  }

  await db.membership.update({
    where: {
      id: memberId,
    },
    data: {
      role,
    },
  });

  revalidatePath(`${CP_PREFIX}/${teamSlug}`);
  return {
    status: 'OK',
    message: 'Role changed successfully',
  };
};
