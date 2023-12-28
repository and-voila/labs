'use client';

import React, { useCallback, useMemo, useRef } from 'react';
// import { WebSocketStatus } from '@hocuspocus/provider';
import { EditorContent, PureEditorContent } from '@tiptap/react';

import { LinkMenu } from '#/components/tiptap/menus';

import { useBlockEditor } from '#/hooks/tiptap/use-block-editor';

import '#/styles/partials/index.css';

import { createPortal } from 'react-dom';

import { Sidebar } from '#/components/tiptap/sidebar';
import { Loader } from '#/components/tiptap/ui/loader';

import { EditorContext } from '#/context/tiptap/editor-context';
import ImageBlockMenu from '#/extensions/image-block/components/image-block-menu';
import { ColumnsMenu } from '#/extensions/multi-column/menus';
import { TableColumnMenu, TableRowMenu } from '#/extensions/table/menus';
import { useAIState } from '#/hooks/tiptap/use-ai-state';

import { ContentItemMenu } from '../menus/content-item-menu';
import { TextMenu } from '../menus/text-menu';
import { EditorHeader } from './components/editor-header';
import { TiptapProps } from './types';

export const BlockEditor = ({ aiToken, ydoc, provider }: TiptapProps) => {
  const aiState = useAIState();
  const menuContainerRef = useRef(null);
  const editorRef = useRef<PureEditorContent | null>(null);

  const setEditorRef = useCallback((instance: HTMLDivElement | null) => {
    if (instance) {
      // Assuming `PureEditorContent` is a class and `instance` is an instance of that class
      editorRef.current = instance as unknown as PureEditorContent;
    } else {
      editorRef.current = null;
    }
  }, []);

  const { editor, users, characterCount, collabState, leftSidebar } =
    useBlockEditor({ aiToken, ydoc, provider });

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
        <Sidebar
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
            className="flex-1 overflow-y-auto"
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
