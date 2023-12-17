import { APP_BP } from '#/lib/const';

import { Icons } from '#/components/shared/icons';

type Tab = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
  isActive?: boolean;
};

export interface WriteConfigProps {
  teamSlug: string;
}

export const writeConfig = ({ teamSlug }: WriteConfigProps) => ({
  defaultTabs: [
    {
      name: 'Tools',
      href: `${APP_BP}/${teamSlug}/tools`,
      icon: 'home',
    },
    {
      name: 'Write',
      href: `${APP_BP}/${teamSlug}/tools/write`,
      icon: 'pen',
    },
    {
      name: 'Sites',
      href: `${APP_BP}/${teamSlug}/tools/write/sites`,
      icon: 'browsers',
    },
  ] as Tab[],
  siteTabs: (id: string): Tab[] => [
    {
      name: 'Write',
      href: `${APP_BP}/${teamSlug}/tools/write`,
      icon: 'pen',
    },
    {
      name: 'Sites',
      href: `${APP_BP}/${teamSlug}/tools/write/sites`,
      icon: 'browsers',
    },
    {
      name: 'Manage site',
      href: `${APP_BP}/${teamSlug}/tools/write/site/${id}`,
      icon: 'browser',
    },
  ],
  postTabs: (id: string, siteId: string): Tab[] => [
    {
      name: 'Sites',
      href: `${APP_BP}/${teamSlug}/tools/write/sites`,
      icon: 'browsers',
    },
    {
      name: 'Posts',
      href: siteId
        ? `${APP_BP}/${teamSlug}/tools/write/site/${siteId}`
        : `${APP_BP}/${teamSlug}/tools/write/sites`,
      icon: 'files',
    },
    {
      name: 'Editor',
      href: `${APP_BP}/${teamSlug}/tools/write/post/${id}`,
      icon: 'pen',
    },
  ],
});
