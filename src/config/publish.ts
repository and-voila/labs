import { APP_BP } from '#/lib/const';

import { Icons } from '#/components/shared/icons';

type Tab = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
  isActive?: boolean;
};

export interface PublishConfigProps {
  teamSlug: string;
}

export const publishConfig = ({ teamSlug }: PublishConfigProps) => ({
  defaultTabs: [
    {
      name: 'Publish',
      href: `${APP_BP}/${teamSlug}/workspace/publish`,
      icon: 'dashboard',
    },
    {
      name: 'Sites',
      href: `${APP_BP}/${teamSlug}/workspace/publish/sites`,
      icon: 'browsers',
    },
  ] as Tab[],
  siteTabs: (id: string): Tab[] => [
    {
      name: 'Publish',
      href: `${APP_BP}/${teamSlug}/workspace/publish`,
      icon: 'dashboard',
    },
    {
      name: 'Sites',
      href: `${APP_BP}/${teamSlug}/workspace/publish/sites`,
      icon: 'browsers',
    },
    {
      name: 'Manage site',
      href: `${APP_BP}/${teamSlug}/workspace/publish/site/${id}`,
      icon: 'browser',
    },
  ],
  postTabs: (id: string, siteId: string): Tab[] => [
    {
      name: 'Sites',
      href: `${APP_BP}/${teamSlug}/workspace/publish/sites`,
      icon: 'browsers',
    },
    {
      name: 'Posts',
      href: siteId
        ? `${APP_BP}/${teamSlug}/workspace/publish/site/${siteId}`
        : `${APP_BP}/${teamSlug}/workspace/publish/sites`,
      icon: 'files',
    },
    {
      name: 'Editor',
      href: `${APP_BP}/${teamSlug}/workspace/publish/post/${id}`,
      icon: 'pen',
    },
  ],
});
