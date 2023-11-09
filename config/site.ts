import { SiteConfig } from 'types';
import { env } from '@/env.mjs';

const siteUrl = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  company: 'BRIL.LA, LLC.',
  name: 'And Voila Labs',
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
