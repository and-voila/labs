import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { MembershipRole } from '@prisma/client';

import { siteConfig } from '#/config/site';

import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
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
        heading="Danger zone"
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
  const description = `Safely delete your personal account on ${siteConfig.name}. Manage your data and privacy with full control.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/my/advanced`;

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
