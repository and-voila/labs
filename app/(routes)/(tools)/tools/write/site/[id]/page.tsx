/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { DashboardHeader } from '@/app/components/dashboard/header';
import { DashboardShell } from '@/app/components/dashboard/shell';
import { Icons } from '@/app/components/shared/icons';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import CreatePostButton from '@/app/components/write/create-post-button';
import Form from '@/app/components/write/form';
import DeleteSiteForm from '@/app/components/write/form/delete-site-form';
import Posts from '@/app/components/write/posts';
import { updateSite } from '@/app/lib/actions';
import { db } from '@/app/lib/db';
import { getSession } from '@/app/lib/session';

export default async function SitePosts({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  const data = await db.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    cacheStrategy: {
      ttl: 20,
      swr: 10,
    },
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Manage ${data.name}`}
        text={`Manage your site and content for ${data.name}. From drafting posts to customizing the domain, logo, and fonts.`}
      />
      <Tabs defaultValue="my-posts">
        <TabsList>
          <TabsTrigger value="my-posts">My posts</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>
        <TabsContent value="my-posts">
          <div className="my-8 flex flex-col space-y-6">
            <div className="mt-10 border-b border-primary pb-5 sm:flex sm:items-center sm:justify-between">
              <h3 className="text-2xl font-semibold leading-6">
                Posts for {data.name}
              </h3>
              <div className="mt-3 flex sm:ml-4 sm:mt-0">
                <a
                  href={
                    process.env.NEXT_PUBLIC_VERCEL_ENV
                      ? `https://${url}`
                      : `http://${data.subdomain}.localhost:3001`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mr-2 inline-flex items-center truncate rounded-md bg-muted-foreground/20 px-2 font-mono text-xs text-foreground transition-colors hover:opacity-70"
                >
                  {url}
                  {''}
                  <Icons.arrowSquareOut className="ml-1 h-4 w-4" />
                </a>
                <CreatePostButton />
              </div>
            </div>
            <Posts siteId={decodeURIComponent(params.id)} />
          </div>
        </TabsContent>
        <TabsContent value="general">
          <div className="my-8 flex flex-col space-y-6">
            <div className="mt-10 border-b border-primary/70 pb-5">
              <h3 className="text-2xl font-semibold leading-6">
                General settings
              </h3>
            </div>
            <Form
              title="Name"
              description="The name of your site. This will be used as the meta title on Google as well."
              helpText="For optimal results, we recommend a 32 character limit."
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
              helpText="Create an SEO description with keywords. We suggest a length of 140-159 characters."
              inputAttrs={{
                name: 'description',
                type: 'text',
                defaultValue: data?.description!,
                placeholder: 'A blog about really interesting things.',
              }}
              handleSubmit={updateSite}
            />
          </div>
        </TabsContent>
        <TabsContent value="domains">
          <div className="my-8 flex flex-col space-y-6">
            <div className="mt-10 border-b border-primary/70 pb-5">
              <h3 className="text-2xl font-semibold leading-6">
                Domain settings
              </h3>
            </div>
            <Form
              title="Subdomain"
              description="Update the subdomain for your site."
              helpText="Up to 32 characters. Think twice about changes, as this will affect your site's SEO."
              inputAttrs={{
                name: 'subdomain',
                type: 'text',
                defaultValue: data?.subdomain!,
                placeholder: 'subdomain',
                maxLength: 32,
              }}
              handleSubmit={updateSite}
            />
            <Form
              title="Custom Domain"
              description="Bring your own domain in under 60 seconds."
              helpText="Please enter a valid domain you own and follow the on-screen set-up wizard."
              inputAttrs={{
                name: 'customDomain',
                type: 'text',
                defaultValue: data?.customDomain!,
                placeholder: 'yourdomain.com',
                maxLength: 64,
                pattern: '^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$',
              }}
              handleSubmit={updateSite}
            />
          </div>
        </TabsContent>
        <TabsContent value="appearance">
          <div className="my-8 flex flex-col space-y-6">
            <div className="mt-10 border-b border-primary/70 pb-5">
              <h3 className="text-2xl font-semibold leading-6">
                Appearance settings
              </h3>
            </div>
            <Form
              title="Featured image"
              description="Add or replace the featured image for your site. Accepted formats: .png, .jpg, .jpeg"
              helpText="Max file size 1MB. Recommended size 1200x630."
              inputAttrs={{
                name: 'image',
                type: 'file',
                defaultValue: data?.image!,
              }}
              handleSubmit={updateSite}
            />
            <Form
              title="Site logo"
              description="Add or update the logo and favicon for your site. Accepted formats: .png, .jpg, .jpeg"
              helpText="Max file size 1MB. Recommended size 400x400."
              inputAttrs={{
                name: 'logo',
                type: 'file',
                defaultValue: data?.logo!,
              }}
              handleSubmit={updateSite}
            />
            <Form
              title="Headings font"
              description="The font for the headings on your site."
              helpText="Please select a font."
              inputAttrs={{
                name: 'font',
                type: 'select',
                defaultValue: data?.font!,
              }}
              handleSubmit={updateSite}
            />
            <Form
              title="404 Page Message"
              description="Message to be displayed on the 404 page."
              helpText="Please use 240 characters maximum."
              inputAttrs={{
                name: 'message404',
                type: 'text',
                defaultValue: data?.message404!,
                placeholder: "Oops! You've found a page that doesn't exist.",
                maxLength: 240,
              }}
              handleSubmit={updateSite}
            />
          </div>
        </TabsContent>
        <TabsContent value="danger">
          <div className="my-8 flex flex-col space-y-6">
            <div className="mt-10 border-b border-primary/70 pb-5">
              <h3 className="text-2xl font-semibold leading-6">Danger zone</h3>
            </div>
            <DeleteSiteForm siteName={data?.name!} />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Manage Site';
  const description =
    'Make your And Voila blog site your own. Draft and publish posts, customize the domain, logo, and fonts. Or delete with ease for total control';

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
