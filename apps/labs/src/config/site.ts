import type { SiteConfig } from '#/lib/types';

import { SITE_URL } from '#/lib/const';

const siteUrl = SITE_URL;

export const siteConfig: SiteConfig = {
  company: 'BRIL.LA, LLC.',
  name: 'And Voila',
  description:
    'We help digital marketers gain superpowers. Join the community, use our playbooks, and AI-assisted tools. And voila! Watch your marketing ROI skyrocket. 🔥',
  url: siteUrl,
  ogImage: `${siteUrl}/open-graph.gif`,
  links: {
    twitter: 'https://twitter.com/rebekahradice',
    github: 'https://github.com/and-voila/labs/',
  },
  mailSupport: 'yo@andvoila.gg',
};
