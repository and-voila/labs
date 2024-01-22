import type { WebSocketStatus } from '@hocuspocus/provider';

import type { EditorUser } from './types';

import { Icon } from '#/components/tiptap/icon';
import { Toolbar } from '#/components/tiptap/toolbar';

import { EditorInfo } from './editor-info';

export interface EditorHeaderProps {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
  characters: number;
  words: number;
  collabState: WebSocketStatus;
  users: EditorUser[];
}

export const EditorHeader = ({
  characters,
  collabState,
  users,
  words,
  isSidebarOpen,
  toggleSidebar,
}: EditorHeaderProps) => {
  return (
    <>
      <div className="fixed top-0 z-20 flex h-16 w-screen flex-none flex-row items-center justify-between border-b bg-background/60 px-4 py-2 text-muted-foreground backdrop-blur-xl transition-all">
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
    </>
  );
};
