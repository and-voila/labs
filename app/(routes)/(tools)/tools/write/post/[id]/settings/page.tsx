/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { notFound, redirect } from 'next/navigation';

import Form from '@/app/components/write/form';
import DeletePostForm from '@/app/components/write/form/delete-post-form';
import { updatePostMetadata } from '@/app/lib/actions';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';

export default async function PostSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  const data = await db.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Post Settings
        </h1>
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

        <DeletePostForm postName={data?.title!} />
      </div>
    </div>
  );
}
