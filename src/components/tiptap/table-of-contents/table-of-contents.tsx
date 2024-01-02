'use client';

import { memo, useEffect, useState } from 'react';
import { TableOfContentStorage } from '@tiptap-pro/extension-table-of-content';
import { Editor as CoreEditor } from '@tiptap/core';

import { cn } from '#/lib/utils';

export type TableOfContentsProps = {
  editor: CoreEditor;
  onItemClick?: () => void;
};

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
        <div className="mb-2 text-xs font-semibold uppercase text-foreground">
          Table of contents
        </div>
        {data && data.content.length > 0 ? (
          <div className="flex flex-col gap-1">
            {data.content.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{ marginLeft: `${1 * item.level - 1}rem` }}
                onClick={onItemClick}
                className={cn(
                  'block w-full truncate rounded bg-opacity-10 p-1 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/20 hover:text-foreground',
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
