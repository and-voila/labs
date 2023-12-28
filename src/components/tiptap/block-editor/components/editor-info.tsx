import { memo } from 'react';
import { WebSocketStatus } from '@hocuspocus/provider';

import { cn } from '#/lib/tiptap/utils';
import { getConnectionText } from '#/lib/tiptap/utils/get-connection-text';

import Tooltip from '#/components/tiptap/ui/tooltip';

import { EditorUser } from '../types';

export type EditorInfoProps = {
  characters: number;
  words: number;
  collabState: WebSocketStatus;
  users: EditorUser[];
};

export const EditorInfo = memo(
  ({ characters, collabState, users, words }: EditorInfoProps) => {
    return (
      <div className="flex items-center">
        <div className="mr-4 flex flex-col justify-center border-r pr-4 text-right">
          <div className="text-xs font-semibold text-muted-foreground">
            {words} {words === 1 ? 'word' : 'words'}
          </div>
          <div className="text-xs font-semibold text-muted-foreground">
            {characters} {characters === 1 ? 'character' : 'characters'}
          </div>
        </div>
        <div className="mr-2 flex items-center gap-2">
          <div
            className={cn('h-2 w-2 rounded-full', {
              'bg-yellow-600 dark:bg-yellow-500': collabState === 'connecting',
              'bg-green-600 dark:bg-green-500': collabState === 'connected',
              'bg-red-600 dark:bg-red-500': collabState === 'disconnected',
            })}
          />
          <span className="max-w-[4rem] text-xs font-semibold text-muted-foreground">
            {getConnectionText(collabState)}
          </span>
        </div>
        {collabState === 'connected' && (
          <div className="flex flex-row items-center">
            <div className="relative ml-3 flex flex-row items-center">
              {users.map((user: EditorUser) => (
                <div key={user.clientId} className="-ml-3">
                  <Tooltip title={user.name}>
                    <img
                      className="h-8 w-8 rounded-full border shadow-sm"
                      src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${
                        user.name
                      }&backgroundColor=${user.color.replace('#', '')}`}
                      alt="avatar"
                    />
                  </Tooltip>
                </div>
              ))}
              {users.length > 3 && (
                <div className="-ml-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-background bg-[#FFA2A2] text-xs font-bold leading-none">
                    +{users.length - 3}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

EditorInfo.displayName = 'EditorInfo';
