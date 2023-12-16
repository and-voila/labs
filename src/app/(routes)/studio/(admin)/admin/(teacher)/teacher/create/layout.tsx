import { Metadata } from 'next';

import { siteConfig } from '#/config/site';

import { APP_BP, SITE_URL } from '#/lib/const';

import CreatePage from './page';

export function generateMetadata(): Metadata {
  const title = 'New Playbook';
  const description = `Look at you, the brilliant ${siteConfig.name} Admin creating a new Playbook so our members can thrive. Hat's off to you. You're helping make digital marketing awesome.`;

  const pageUrl = `${SITE_URL}${APP_BP}/admin/create`;

  const metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [
        {
          url: '/open-graph.gif',
          width: 1200,
          height: 630,
          alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
        },
      ],
      url: pageUrl,
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: '/open-graph.gif',
          width: 1200,
          height: 630,
          alt: 'An open graph image that appears to look like a Loading screen with the And Voila logo.',
        },
      ],
    },
  };

  return metadata;
}
export default CreatePage;
