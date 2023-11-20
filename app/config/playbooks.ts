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
      href: '/insights',
      disabled: true,
    },
    {
      title: 'Guides',
      href: '/guides',
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
