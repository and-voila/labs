import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { APP_BP } from '#/lib/const';
import { getSession } from '#/lib/session';

import { DashboardHeader } from '#/components/dashboard/header';
import { AppearanceForm } from '#/components/forms/appearance-form';
import { DisplayNameForm } from '#/components/forms/display-name-form';
import { UserNameForm } from '#/components/forms/user-name-form';

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const user = session.user;

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="General settings"
        text="Make it yours. Personalize to your heart's content. Tweak your profile, account details, and set the vibe just right."
      />

      <div className="grid max-w-3xl gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || '' }} />
        <DisplayNameForm
          user={{ id: user.id, displayName: user.displayName || '' }}
        />
        <AppearanceForm />
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Account Settings';
  const description =
    'Customize your And Voila account settings. Update your username, display name, choose themes, and more.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}${APP_BP}/settings/general`;

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
