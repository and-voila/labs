import { redirect } from 'next/navigation';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { UserNameForm } from '@/app/components/forms/user-name-form';
import { authOptions } from '@/app/lib/auth';
import { getCurrentUser } from '@/app/lib/session';

export const metadata = {
  title: 'Settings',
  description: 'Manage your account settings.',
};

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
