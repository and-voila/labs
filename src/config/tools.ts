import { APP_BP } from '#/lib/const';
import { ToolsConfig } from '#/lib/types';

export const toolsConfig: ToolsConfig = {
  sidebarNav: [
    {
      title: 'Home',
      href: `${APP_BP}/tools`,
      icon: 'toolbox',
    },
    {
      title: 'Chat',
      href: `${APP_BP}/tools/chat`,
      icon: 'chat',
      disabled: true,
    },
    {
      title: 'Write',
      href: `${APP_BP}/tools/write`,
      icon: 'pen',
    },
    {
      title: 'Optimize',
      href: `${APP_BP}/tools/chat`,
      icon: 'toolbox',
      disabled: true,
    },
    {
      title: 'Distribute',
      href: `${APP_BP}/tools/distribute`,
      icon: 'paperPlane',
      disabled: true,
    },
  ],
};
