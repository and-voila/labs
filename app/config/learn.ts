import { LearnConfig } from '@/app/lib/types';

export const learnConfig: LearnConfig = {
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
    },
    {
      title: 'Insights',
      href: '/docs',
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
