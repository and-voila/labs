import { db } from '#/lib/db';

export const acceptInvitationByToken = async (
  userId: string,
  token: string,
) => {
  // fail fast if a invalid token is provided
  const invitation = await db.teamInvitation.findFirst({
    where: {
      token,
    },
  });
  if (!invitation) {
    throw new Error('Invalid invitation token');
  }

  void db.$transaction(async (trx) => {
    // we delete the invitation and create a new membership for the user
    const result = await trx.membership.create({
      data: {
        teamId: invitation.teamId,
        userId,
        role: invitation.role,
        accepted: true,
      },
    });

    if (!result) {
      throw new Error('Failed to create membership');
    }

    await trx.teamInvitation.delete({
      where: {
        id: invitation.id,
      },
    });
  });
};
