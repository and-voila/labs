import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { MembershipRole } from '@prisma/client';

import { authOptions } from '#/lib/auth';
import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import { AppearanceForm } from '#/components/forms/appearance-form';
import { DeleteAccountForm } from '#/components/forms/delete-account-form';
import { DisplayNameForm } from '#/components/forms/display-name-form';
import { UserNameForm } from '#/components/forms/user-name-form';

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const user = session.user;

  const teams = await db.team.findMany({
    where: {
      members: {
        some: {
          role: MembershipRole.OWNER,
        },
      },
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your profile and account."
      />
      <div className="grid max-w-3xl gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || '' }} />
        <DisplayNameForm
          user={{ id: user.id, displayName: user.displayName || '' }}
        />
        <AppearanceForm />
        <DeleteAccountForm teams={teams} />
      </div>
    </DashboardShell>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Account Settings';
  const description =
    "Wow, the And Voila Settings page was created just so you could...update your name? LOL, we're working on it, promise.";

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/app/settings`;

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: pageUrl,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };

  return metadata;
}