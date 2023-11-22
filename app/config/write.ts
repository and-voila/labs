import { Icons } from '../components/shared/icons';

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
      href: '/tools',
      icon: 'toolbox',
    },
    {
      name: 'Write',
      href: '/tools/write',
      icon: 'pen',
    },
    {
      name: 'Sites',
      href: '/tools/write/sites',
      icon: 'browsers',
    },
  ] as Tab[],
  siteTabs: (id: string): Tab[] => [
    {
      name: 'Write',
      href: '/tools/write',
      icon: 'pen',
    },
    {
      name: 'Sites',
      href: '/tools/write/sites',
      icon: 'browsers',
    },
    {
      name: 'Manage site',
      href: `/tools/write/site/${id}`,
      icon: 'browser',
    },
  ],
  postTabs: (id: string, siteId: string): Tab[] => [
    {
      name: 'Sites',
      href: '/tools/write/sites',
      icon: 'browsers',
    },
    {
      name: 'Posts',
      href: siteId ? `/tools/write/site/${siteId}` : '/tools/write/sites',
      icon: 'files',
    },
    {
      name: 'Editor',
      href: `/tools/write/post/${id}`,
      icon: 'pen',
    },
  ],
};
