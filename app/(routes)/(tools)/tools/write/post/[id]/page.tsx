import { Metadata } from 'next';
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

export function generateMetadata(): Metadata {
  const title = 'Edit Post';
  const description =
    'Draft content with And Voila Edit Post. Embrace a Notion-inspired, AI-powered editor built on Novel.sh for seamless creation and editing that feels like magic.';

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${baseUrl}/tools/write`;

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
