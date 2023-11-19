import { ToolsConfig } from '@/app/lib/types';

export const toolsConfig: ToolsConfig = {
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
      title: 'Home',
      href: '/dashboard',
      icon: 'home',
    },
    {
      title: 'Chat',
      href: '/tools/chat',
      icon: 'chat',
      disabled: true,
    },
    {
      title: 'Write',
      href: '/tools/write',
      icon: 'pen',
    },
    {
      title: 'Optimize',
      href: '/tools/chat',
      icon: 'toolbox',
      disabled: true,
    },
    {
      title: 'Distribute',
      href: '/dashboard/support',
      icon: 'paperPlane',
      disabled: true,
    },
  ],
};
