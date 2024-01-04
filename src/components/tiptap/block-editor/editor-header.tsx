import { WebSocketStatus } from '@hocuspocus/provider';

import { APP_BP } from '#/lib/const';

import { TabbedNav } from '#/components/layout/tabbed-nav';
import { Icon } from '#/components/tiptap/icon';
import { Toolbar } from '#/components/tiptap/toolbar';

import { EditorInfo } from './editor-info';
import { EditorUser } from './types';

export type EditorHeaderProps = {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
  characters: number;
  words: number;
  collabState: WebSocketStatus;
  users: EditorUser[];
  postId: string;
  siteId: string;
  teamSlug: string;
};

export const EditorHeader = ({
  characters,
  collabState,
  users,
  words,
  isSidebarOpen,
  toggleSidebar,
  postId,
  siteId,
  teamSlug,
}: EditorHeaderProps) => {
  const links = [
    {
      href: `${APP_BP}/${teamSlug}/workspace/publish/site/${siteId}`,
      label: 'Posts',
      exact: true,
    },
    {
      href: `${APP_BP}/${teamSlug}/workspace/publish/post/${postId}`,
      label: 'Compose',
      exact: true,
    },

    {
      href: `${APP_BP}/${teamSlug}/workspace/publish/post/${postId}/metadata`,
      label: 'Metadata',
      exact: true,
    },
    {
      href: `${APP_BP}/${teamSlug}/workspace/publish/post/${postId}/advanced`,
      label: 'Advanced',
    },
  ];

  return (
    <>
      <div className="flex flex-none flex-row items-center justify-between border-b bg-background px-4 py-2 text-muted-foreground">
        <div className="flex flex-row items-center gap-x-1.5">
          <div className="flex items-center gap-x-1.5">
            <Toolbar.Button
              tooltip={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              onClick={toggleSidebar}
              active={isSidebarOpen}
              className={isSidebarOpen ? 'bg-transparent' : ''}
            >
              <Icon name={isSidebarOpen ? 'PanelLeftClose' : 'PanelLeft'} />
            </Toolbar.Button>
          </div>
        </div>
        <EditorInfo
          characters={characters}
          words={words}
          collabState={collabState}
          users={users}
        />
      </div>
      <div className="w-full max-w-7xl px-24 pb-16 pt-4">
        <TabbedNav links={links} />
      </div>
    </>
  );
};
