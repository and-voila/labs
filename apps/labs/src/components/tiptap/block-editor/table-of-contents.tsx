'use client';

import type { TableOfContentStorage } from '@tiptap-pro/extension-table-of-content';
import type { Editor as CoreEditor } from '@tiptap/core';

import { memo, useEffect, useState } from 'react';

import { cn } from '@and-voila/ui';

export interface TableOfContentsProps {
  editor: CoreEditor;
  onItemClick?: () => void;
}

export const TableOfContents = memo(
  ({ editor, onItemClick }: TableOfContentsProps) => {
    const [data, setData] = useState<TableOfContentStorage | null>(null);

    useEffect(() => {
      const handler = ({ editor: currentEditor }: { editor: CoreEditor }) => {
        setData({ ...currentEditor.extensionStorage.tableOfContent });
      };

      handler({ editor });

      editor.on('update', handler);
      editor.on('selectionUpdate', handler);

      return () => {
        editor.off('update', handler);
        editor.off('selectionUpdate', handler);
      };
    }, [editor]);

    return (
      <>
        {data && data.content.length > 0 ? (
          <div className="ml-2 flex flex-col gap-1">
            {data.content.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{ marginLeft: `${0.25 * item.level - 1}rem` }}
                onClick={onItemClick}
                className={cn(
                  'block w-full truncate rounded bg-opacity-10 p-1 text-xs font-medium text-muted-foreground transition-all hover:bg-primary/20 hover:text-foreground',
                  item.isActive &&
                    'bg-primary/20 font-semibold text-foreground',
                )}
              >
                {item.itemIndex}. {item.textContent}
              </a>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            Start adding headlines to your document …
          </div>
        )}
      </>
    );
  },
);

TableOfContents.displayName = 'TableOfContents';
