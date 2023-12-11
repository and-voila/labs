import { Metadata } from 'next';

import CreatePage from '#/(routes)/(admin)/admin/(teacher)/teacher/create/page';

export function generateMetadata(): Metadata {
  const title = 'New Playbook';
  const description =
    "Look at you, the brilliant And Voila Admin creating a new Playbook so our members can thrive. Hat's off to you. You're helping make digital marketing awesome.";

  const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/admin/teacher/create`
    : 'http://localhost:3001/admin/teacher/create';

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
      url,
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
