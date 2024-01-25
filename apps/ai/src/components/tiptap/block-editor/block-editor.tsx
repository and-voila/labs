// import { WebSocketStatus } from '@hocuspocus/provider';
import type { PureEditorContent } from '@tiptap/react';

import React, { useCallback, useMemo, useRef } from 'react';
import { EditorContent } from '@tiptap/react';

import { useBlockEditor } from '#/hooks/tiptap/use-block-editor';

import '@and-voila/ui/styles/partials/index.css';

import { createPortal } from 'react-dom';

import type { TiptapProps } from './types';

import { EditorSidebar } from '#/components/tiptap/block-editor/editor-sidebar';
import { Loader } from '#/components/tiptap/loader';
import { ContentItemMenu } from '#/components/tiptap/menus/content-item-menu/content-item-menu';
import { LinkMenu } from '#/components/tiptap/menus/link-menu/link-menu';
import { TextMenu } from '#/components/tiptap/menus/text-menu/text-menu';

import { EditorContext } from '#/context/tiptap/editor-context';
import ImageBlockMenu from '#/extensions/image-block/image-block-menu';
import { ColumnsMenu } from '#/extensions/multi-column/columns-menu';
import TableColumnMenu from '#/extensions/table/menus/table-column/table-column-menu';
import TableRowMenu from '#/extensions/table/menus/table-row/table-row-menu';
import { useAIState } from '#/hooks/tiptap/use-ai-state';

import { EditorHeader } from './editor-header';

export const BlockEditor = ({ aiToken, ydoc, provider, user }: TiptapProps) => {
  const aiState = useAIState();
  const menuContainerRef = useRef(null);
  const editorRef = useRef<PureEditorContent | null>(null);

  const setEditorRef = useCallback((instance: HTMLDivElement | null) => {
    if (instance) {
      editorRef.current = instance as unknown as PureEditorContent;
    } else {
      editorRef.current = null;
    }
  }, []);

  const { editor, users, characterCount, collabState, leftSidebar } =
    useBlockEditor({ aiToken, ydoc, provider, user });

  const displayedUsers = users.slice(0, 3);

  const providerValue = useMemo(() => {
    return {
      isAiLoading: aiState.isAiLoading,
      aiError: aiState.aiError,
      setIsAiLoading: aiState.setIsAiLoading,
      setAiError: aiState.setAiError,
    };
  }, [aiState]);

  if (!editor) {
    return null;
  }

  const aiLoaderPortal = createPortal(
    <Loader label="AI is now doing its job." />,
    document.body,
  );

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex h-full" ref={menuContainerRef}>
        <EditorSidebar
          isOpen={leftSidebar.isOpen}
          onClose={leftSidebar.close}
          editor={editor}
        />
        <div className="relative flex h-full flex-1 flex-col overflow-hidden">
          <EditorHeader
            characters={characterCount.characters()}
            collabState={collabState}
            users={displayedUsers}
            words={characterCount.words()}
            isSidebarOpen={leftSidebar.isOpen}
            toggleSidebar={leftSidebar.toggle}
          />
          <EditorContent
            editor={editor}
            ref={setEditorRef}
            className="flex-1 overflow-y-auto py-16"
          />
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </div>
      </div>
      {aiState.isAiLoading && aiLoaderPortal}
    </EditorContext.Provider>
  );
};

export default BlockEditor;
