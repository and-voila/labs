import { PlaybooksConfig } from '@/app/lib/types';

export const playbooksConfig: PlaybooksConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      isLoggedIn: true,
    },
    {
      title: 'Admin',
      href: '/admin',
      isTeacher: true,
    },
    {
      title: 'Community',
      href: 'https://discord.com/channels/1151749282806910976/1154115151407091862',
      isExternal: true,
    },
    {
      title: 'Playbooks',
      href: '/learn',
    },
    {
      title: 'Tools',
      href: '/tools',
      disabled: true,
    },
    {
      title: 'Insights',
      href: '/docs',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'My playbooks',
      href: '/learn',
      icon: 'bookmarks',
    },
    {
      title: 'Browse',
      href: '/learn/search',
      icon: 'courses',
    },
  ],
};
