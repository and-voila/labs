import type { WebSocketStatus } from '@hocuspocus/provider';

import { memo } from 'react';

import { cn } from '@av/ui';

import type { EditorUser } from './types';

import { getConnectionText } from '#/lib/tiptap/utils/get-connection-text';

import Tooltip from '#/components/tiptap/tooltip';

export interface EditorInfoProps {
  characters: number;
  words: number;
  collabState: WebSocketStatus;
  users: EditorUser[];
}

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
              // TODO: Make TS happy about this
              // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
              'bg-yellow-600 dark:bg-yellow-500': collabState === 'connecting',
              // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
              'bg-green-600 dark:bg-green-500': collabState === 'connected',
              // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
              'bg-red-600 dark:bg-red-500': collabState === 'disconnected',
            })}
          />
          <span className="max-w-[4rem] text-xs font-semibold text-muted-foreground">
            {getConnectionText(collabState)}
          </span>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
        {collabState === 'connected' && (
          <div className="flex flex-row items-center">
            <div className="relative ml-3 flex flex-row items-center">
              {users.map((user: EditorUser) => (
                <div key={user.id} className="-ml-3">
                  <Tooltip title={user.displayName ?? 'Hello world'}>
                    <img
                      className="h-8 w-8 rounded-full border shadow-sm"
                      src={
                        user.image ??
                        `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${
                          user.displayName
                        }&backgroundColor=${(
                          user.color ?? 'bg-primary'
                        ).replace('#', '')}`
                      }
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
