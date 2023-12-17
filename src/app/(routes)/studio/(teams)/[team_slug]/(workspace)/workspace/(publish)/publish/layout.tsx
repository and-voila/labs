import { redirect } from 'next/navigation';

import { authOptions } from '#/lib/auth';
import { getTeam } from '#/lib/team/get-current-team';

import PublishNav from '#/components/publish/publish-nav';

interface ToolsLayoutProps {
  children?: React.ReactNode;
  params: {
    team_slug: string;
  };
}

export default async function ToolsLayout({
  children,
  params,
}: ToolsLayoutProps) {
  const team = await getTeam(params.team_slug);

  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col py-8 md:flex">
          <PublishNav teamSlug={params.team_slug} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
