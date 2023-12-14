import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getSession } from '#/lib/session';
import { getInvitationByToken } from '#/lib/team/members/get-invitation';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert';
import { buttonVariants } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

import SignOutButton from './sign-out-button';

type Props = {
  params: {
    token: string;
  };
};

const AcceptInvitation = async ({ params }: Props) => {
  const [session, invitation] = await Promise.all([
    getSession(),
    getInvitationByToken(params.token),
  ]);

  if (!invitation) {
    notFound();
  }

  // TODO: Implement accept membership
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const acceptMembership = () => {
    // console.log('accept membership');
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:max-w-md">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
          Join the {invitation.team.name} crew
        </h1>
        <p className="text-base text-muted-foreground lg:text-lg">
          You&apos;re invited to join the{' '}
          <span className="font-bold text-primary">{invitation.team.name}</span>{' '}
          team on And Voila by{' '}
          <span className="font-bold text-primary">
            {invitation.invitedBy.name ?? invitation.invitedBy.email}
          </span>
          . To accept, please log in or create your free account.
        </p>
      </div>
      {!session && (
        <>
          <Card className="py-6">
            <CardHeader className="space-y-1">
              <CardTitle>Log in or create your account</CardTitle>
              <CardDescription>Please authenticate to accept.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link
                href={`/register?token=${invitation.token}`}
                prefetch={false}
                className={cn(buttonVariants({ variant: 'default' }), 'my-4')}
              >
                Create Account
              </Link>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/70" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <Link
                href={`/login?token=${invitation.token}`}
                prefetch={false}
                className={cn(buttonVariants({ variant: 'secondary' }), 'my-4')}
              >
                Log in to your account
              </Link>
            </CardContent>
          </Card>
        </>
      )}
      {/* User authenticated and email matches */}
      {session && session.user.email === invitation.email && (
        <>
          <Link
            prefetch={false}
            href={`/invitations/${invitation.token}/accept`}
            className={buttonVariants({ size: 'lg' })}
          >
            Accept
          </Link>
        </>
      )}
      {/* User authenticated and email does not match */}
      {session && session.user.email !== invitation.email && (
        <Alert>
          <Icons.warning className="h-4 w-4" />
          <AlertTitle className="mb-4">
            This invitation is not for your account.
          </AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>
              {`Your email address ${session.user.email} does not match the email address this invitation was sent to.`}
            </p>
            <p>
              To accept this invitation, you will need to sign out and then sign
              in or create a new account using the same email address used in
              the invitation.
            </p>
            <SignOutButton />
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AcceptInvitation;
