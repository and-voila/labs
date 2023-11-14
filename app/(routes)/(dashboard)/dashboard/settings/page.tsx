import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { UserNameForm } from '@/app/components/forms/user-name-form';
import { authOptions } from '@/app/lib/auth';
import { getCurrentUser } from '@/app/lib/session';

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your profile and account."
      />
      <div className="grid max-w-3xl gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || '' }} />
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

  const pageUrl = `${baseUrl}/dashboard/settings`;

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
