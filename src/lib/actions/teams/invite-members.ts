'use server';

import { revalidatePath } from 'next/cache';
import { MembershipRole } from '@prisma/client';

import { db } from '#/lib/db';
import { getTeam } from '#/lib/operations/teams/get-current-team';
import { createManyInvitations } from '#/lib/operations/teams/members/create-invitation';
import { hasTeamAuthority } from '#/lib/operations/teams/team-authority';
import { getSession } from '#/lib/operations/user/session';
import { sendTeamInviteEmail } from '#/lib/resend/send-team-invite';

export interface InviteMembersInput {
  emails: string[];
  role: MembershipRole;
}

export const inviteMembers = async (
  teamSlug: string,
  data: InviteMembersInput,
) => {
  const sid = teamSlug;

  const session = await getSession();
  if (!session) {
    return {
      status: 'KO',
      message: 'You must be logged in to invite members',
    };
  }

  const team = await getTeam(sid);
  if (!team) {
    return {
      status: 'KO',
      message: 'Team not found',
    };
  }

  if (!(await hasTeamAuthority(session.user.id, team.slug))) {
    return {
      status: 'KO',
      message: 'You must be an admin to invite members',
    };
  }

  const emailsToInvite = data.emails.map((email) => email.toLowerCase());

  // loop over all users and check if they are already in the team
  const usersInTeam = await db.team.findMany({
    where: {
      id: sid,
      OR: [
        {
          members: {
            some: {
              user: {
                email: {
                  in: emailsToInvite,
                },
              },
            },
          },
        },
        {
          invitations: {
            some: {
              email: {
                in: emailsToInvite,
              },
            },
          },
        },
      ],
    },
    select: {
      members: {
        select: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      invitations: {
        select: {
          email: true,
        },
      },
    },
  });

  // filter out users that are already in the team
  const emailsToInviteFiltered = emailsToInvite.filter((email) => {
    return !usersInTeam.some((u) => {
      return (
        u.members.some((m) => m.user.email === email) ||
        u.invitations.some((i) => i.email === email)
      );
    });
  });

  // Send invites
  let invitedCount = 0;
  try {
    const result = await createManyInvitations({
      teamSlug: sid,
      invitedBy: session.user.id,
      emails: emailsToInviteFiltered,
      role: data.role,
    });

    invitedCount = result.count;

    for (const pair of result.pairs) {
      await sendTeamInviteEmail(
        team.name,
        pair.token,
        pair.email,
        session.user.name,
      );
    }
  } catch (error) {
    return {
      status: 'KO',
      message: 'Error inviting members',
    };
  }

  revalidatePath('/');
  return {
    status: 'OK',
    message: `${invitedCount} users invited successfully`,
  };
};
