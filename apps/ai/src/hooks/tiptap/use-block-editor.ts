import { env } from '#/env';

import type { TiptapCollabProvider } from '@hocuspocus/provider';
import type * as Y from 'yjs';

import { useContext, useEffect, useMemo, useState } from 'react';
import { WebSocketStatus } from '@hocuspocus/provider';
import Ai from '@tiptap-pro/extension-ai';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { useEditor } from '@tiptap/react';

import type { EditorUser } from '@av/editor/types';
import { userColors, userNames } from '@av/editor/constants';
import { ExtensionKit } from '@av/editor/extension-kit';
import { initialContent } from '@av/editor/initial-content';
import { randomElement } from '@av/utils';

import { AiEditorContext } from '#/context/ai-editor-context';

const TIPTAP_AI_APP_ID = env.NEXT_PUBLIC_TIPTAP_AI_APP_ID;
const TIPTAP_AI_BASE_URL =
  env.NEXT_PUBLIC_TIPTAP_AI_BASE_URL ?? 'https://api.tiptap.dev/v1/ai';

export const useBlockEditor = ({
  aiToken,
  ydoc,
  provider,
  user,
}: {
  aiToken: string;
  ydoc: Y.Doc;
  provider?: TiptapCollabProvider | null | undefined;
  user: EditorUser;
}) => {
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    WebSocketStatus.Connecting,
  );
  const { setIsAiLoading, setAiError } = useContext(AiEditorContext);

  const randomName = useMemo(() => randomElement(userNames), []);
  const randomColor = useMemo(() => randomElement(userColors), []);

  const editor = useEditor(
    {
      autofocus: false,
      onCreate: ({ editor }) => {
        provider?.on('synced', () => {
          if (editor.isEmpty) {
            editor.commands.setContent(initialContent);
          }
        });
      },
      extensions: [
        ...ExtensionKit({
          provider,
        }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            id: user.id,
            name: user.displayName ?? randomName,
            color: randomColor,
            image: user.image,
            displayName: user.displayName,
          },
        }),
        Ai.configure({
          appId: TIPTAP_AI_APP_ID,
          token: aiToken,
          baseUrl: TIPTAP_AI_BASE_URL,
          autocompletion: true,
          onLoading: () => {
            setIsAiLoading(true);
            setAiError(null);
          },
          onSuccess: () => {
            setIsAiLoading(false);
            setAiError(null);
          },
          onError: (error) => {
            setIsAiLoading(false);
            setAiError(error.message);
          },
        }),
      ],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [ydoc, provider],
  );

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return [];
    }

    return editor.storage.collaborationCursor?.users
      .filter((u: EditorUser) => u.id !== user.id)
      .map((user: EditorUser) => {
        const names = user.displayName?.split(' ');
        const firstName = names?.[0];
        const lastName = names?.[names.length - 1];
        const initials = `${firstName?.[0] ?? '?'}${lastName?.[0] ?? '?'}`;

        return { ...user, initials: initials.length ? initials : '?' };
      });
  }, [editor?.storage.collaborationCursor?.users, user.id]);

  const characterCount = editor?.storage.characterCount ?? {
    characters: () => 0,
    words: () => 0,
  };

  useEffect(() => {
    provider?.on('status', (event: { status: WebSocketStatus }) => {
      setCollabState(event.status);
    });
  }, [provider]);

  // @ts-expect-error TODO:
  window.editor = editor;

  return { editor, users, characterCount, collabState };
};
