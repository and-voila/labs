import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { getTeams } from '#/lib/team/get-teams';

interface PlaybookRootLayoutProps {
  children: React.ReactNode;
}

export default async function PlaybookRootLayout({
  children,
}: PlaybookRootLayoutProps) {
  const { user } = await getTeams();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1">{children}</div>
    </div>
  );
}
