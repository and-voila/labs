/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Form from '@/app/components/write/form';
import DeleteSiteForm from '@/app/components/write/form/delete-site-form';
import { updateSite } from '@/app/lib/actions';
import { db } from '@/app/lib/db';

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await db.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Name"
        description="The name of your site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: 'name',
          type: 'text',
          defaultValue: data?.name!,
          placeholder: 'My Awesome Site',
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Description"
        description="The description of your site. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: 'description',
          type: 'text',
          defaultValue: data?.description!,
          placeholder: 'A blog about really interesting things.',
        }}
        handleSubmit={updateSite}
      />

      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}
