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
      name: 'My sites',
      href: '/tools/write/sites',
      icon: 'browsers',
    },
  ] as Tab[],
  siteTabs: (id: string): Tab[] => [
    {
      name: 'My sites',
      href: '/tools/write/sites',
      icon: 'browsers',
    },
    {
      name: 'Posts',
      href: `/tools/write/site/${id}`,
      icon: 'file',
    },
    {
      name: 'Settings',
      href: `/tools/write/site/${id}/settings`,
      icon: 'settings',
    },
  ],
  postTabs: (id: string, siteId: string): Tab[] => [
    {
      name: 'My posts',
      href: siteId ? `/tools/write/site/${siteId}` : '/tools/write/sites',
      icon: 'file',
    },
    {
      name: 'Editor',
      href: `/tools/write/post/${id}`,
      icon: 'pen',
    },
    {
      name: 'Settings',
      href: `/tools/write/post/${id}/settings`,
      icon: 'settings',
    },
  ],
};
