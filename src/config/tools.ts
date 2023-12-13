import { CP_PREFIX } from '#/lib/const';
import { ToolsConfig } from '#/lib/types';

export const toolsConfig: ToolsConfig = {
  sidebarNav: [
    {
      title: 'Home',
      href: `${CP_PREFIX}/tools`,
      icon: 'toolbox',
    },
    {
      title: 'Chat',
      href: `${CP_PREFIX}/tools/chat`,
      icon: 'chat',
      disabled: true,
    },
    {
      title: 'Write',
      href: `${CP_PREFIX}/tools/write`,
      icon: 'pen',
    },
    {
      title: 'Optimize',
      href: `${CP_PREFIX}/tools/chat`,
      icon: 'toolbox',
      disabled: true,
    },
    {
      title: 'Distribute',
      href: `${CP_PREFIX}/tools/distribute`,
      icon: 'paperPlane',
      disabled: true,
    },
  ],
};
