import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { MembershipRole } from '@prisma/client';

import { authOptions } from '#/lib/auth';
import { CP_PREFIX } from '#/lib/const';
import { db } from '#/lib/db';
import { getSession } from '#/lib/session';

import { DashboardHeader } from '#/components/dashboard/header';
import { DeleteAccountForm } from '#/components/forms/delete-account-form';

export default async function PersonalAdvancedSettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

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
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Danger Zone"
        text="The point of no return. Delete your account here and say goodbye. We'll definitely miss you, so be careful."
      />
      <div className="grid max-w-3xl gap-10">
        <DeleteAccountForm teams={teams} />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Delete Personal Account';
  const description =
    'Safely delete your personal account on And Voila. Manage your data and privacy with full control.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/${CP_PREFIX}/settings/advanced`;

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
