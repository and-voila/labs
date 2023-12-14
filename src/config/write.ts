import { CP_PREFIX } from '#/lib/const';

import { Icons } from '#/components/shared/icons';

type Tab = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
  isActive?: boolean;
};

export const writeConfig = {
  defaultTabs: [
    {
      name: 'Tools',
      href: `${CP_PREFIX}/tools`,
      icon: 'home',
    },
    {
      name: 'Write',
      href: `${CP_PREFIX}/tools/write`,
      icon: 'pen',
    },
    {
      name: 'Sites',
      href: `${CP_PREFIX}/tools/write/sites`,
      icon: 'browsers',
    },
  ] as Tab[],
  siteTabs: (id: string): Tab[] => [
    {
      name: 'Write',
      href: `${CP_PREFIX}/tools/write`,
      icon: 'pen',
    },
    {
      name: 'Sites',
      href: `${CP_PREFIX}/tools/write/sites`,
      icon: 'browsers',
    },
    {
      name: 'Manage site',
      href: `${CP_PREFIX}/tools/write/site/${id}`,
      icon: 'browser',
    },
  ],
  postTabs: (id: string, siteId: string): Tab[] => [
    {
      name: 'Sites',
      href: `${CP_PREFIX}/tools/write/sites`,
      icon: 'browsers',
    },
    {
      name: 'Posts',
      href: siteId
        ? `${CP_PREFIX}/tools/write/site/${siteId}`
        : `${CP_PREFIX}/tools/write/sites`,
      icon: 'files',
    },
    {
      name: 'Editor',
      href: `${CP_PREFIX}/tools/write/post/${id}`,
      icon: 'pen',
    },
  ],
};
