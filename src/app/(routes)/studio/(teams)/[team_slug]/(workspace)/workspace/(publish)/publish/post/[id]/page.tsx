/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { siteConfig } from '#/config/site';

import { updatePostMetadata } from '#/lib/actions/publish/publish-actions';
import { authOptions } from '#/lib/auth';
import { APP_BP, SITE_URL } from '#/lib/const';
import { db } from '#/lib/db';
import { getTeam } from '#/lib/operations/teams/get-current-team';

import { DashboardHeader } from '#/components/dashboard/header';
import { DashboardShell } from '#/components/dashboard/shell';
import Editor from '#/components/publish/editor/editor';
import Form from '#/components/publish/form';
import DeletePostForm from '#/components/publish/form/delete-post-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';

export default async function PostPage({
  params,
}: {
  params: { id: string; team_slug: string };
}) {
  const team = await getTeam(params.team_slug);
  if (!team) {
    redirect(authOptions?.pages?.signIn || '/login');
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
  if (!data || data.teamId !== team.id) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Editing: ${data.title || 'Untitled post'}`}
        text={`Use ${siteConfig.name}'s AI assist to crush writer's block. Activate it with ++. Keep tabs on your IP protection with the indicator to safeguard your work.`}
      />
      <Tabs defaultValue="editor">
        <TabsList>
          <TabsTrigger value="editor">AI Editor</TabsTrigger>
          <TabsTrigger value="post-meta">Metadata</TabsTrigger>
          <TabsTrigger value="danger">Danger zone</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <div className="my-8 flex flex-col space-y-6">
            <Editor post={data} teamSlug={params.team_slug} />
          </div>
        </TabsContent>
        <TabsContent value="post-meta">
          <div className="my-8 flex flex-col space-y-6">
            <div className="mt-10 border-b border-primary/70 pb-5">
              <h3 className="text-2xl font-semibold leading-6">
                Post metadata
              </h3>
            </div>
            <Form
              title="Post Slug"
              description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
              helpText="Please use a slug that is unique to this post."
              inputAttrs={{
                name: 'slug',
                type: 'text',
                defaultValue: data?.slug!,
                placeholder: 'slug',
              }}
              handleSubmit={updatePostMetadata}
            />
            <Form
              title="Thumbnail image"
              description="The thumbnail image for your post. Accepted formats: .png, .jpg, .jpeg"
              helpText="Max file size 50MB. Recommended size 1200x630."
              inputAttrs={{
                name: 'image',
                type: 'file',
                defaultValue: data?.image!,
              }}
              handleSubmit={updatePostMetadata}
            />
          </div>
        </TabsContent>
        <TabsContent value="danger">
          <div className="my-8 flex flex-col space-y-6">
            <div className="mt-10 border-b border-primary/70 pb-5">
              <h3 className="text-2xl font-semibold leading-6">Danger zone</h3>
            </div>
            <DeletePostForm
              postName={data?.title!}
              teamSlug={params.team_slug}
            />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}

export function generateMetadata(): Metadata {
  const title = 'AI Editor';
  const description = `Draft content with ${siteConfig.name} Edit Post. Embrace a Notion-inspired, AI-powered editor built on Novel.sh for seamless creation and editing that feels like magic.`;

  const ogImageUrl = new URL(`${SITE_URL}/api/og`);
  ogImageUrl.searchParams.set('title', title);

  const pageUrl = `${SITE_URL}${APP_BP}/workspace/publish`;

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
