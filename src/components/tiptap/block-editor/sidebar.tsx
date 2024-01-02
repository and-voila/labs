import { memo, useCallback } from 'react';
import { Editor } from '@tiptap/react';

import { cn } from '#/lib/utils';

import { TableOfContents } from './table-of-contents';

export const Sidebar = memo(
  ({
    editor,
    isOpen,
    onClose,
  }: {
    editor: Editor;
    isOpen?: boolean;
    onClose: () => void;
  }) => {
    const handlePotentialClose = useCallback(() => {
      if (window.innerWidth < 1024) {
        onClose();
      }
    }, [onClose]);

    const windowClassName = cn(
      'absolute left-0 top-0 z-[999] h-full w-0 bg-card transition-all duration-300 lg:relative lg:h-auto lg:bg-card/60 lg:backdrop-blur-xl',
      !isOpen && 'border-r-transparent',
      isOpen && 'w-80 border-r',
    );

    return (
      <div className={windowClassName}>
        <div className="h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-auto p-6">
            <TableOfContents
              onItemClick={handlePotentialClose}
              editor={editor}
            />
          </div>
        </div>
      </div>
    );
  },
);

Sidebar.displayName = 'TableOfContentSidepanel';
