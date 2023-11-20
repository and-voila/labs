import { notFound, redirect } from 'next/navigation';

import { DashboardShell } from '@/app/components/dashboard/shell';
import Editor from '@/app/components/write/editor';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  const data = await db.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          subdomain: true,
        },
      },
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <DashboardShell>
      <Editor post={data} />
    </DashboardShell>
  );
}
