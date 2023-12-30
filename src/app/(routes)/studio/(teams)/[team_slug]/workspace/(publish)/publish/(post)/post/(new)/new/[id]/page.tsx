'use client';

import { TiptapCollabProvider } from '@hocuspocus/provider';

import 'iframe-resizer/js/iframeResizer.contentWindow';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { createPortal } from 'react-dom';
import * as Y from 'yjs';

import { BlockEditor } from '#/components/tiptap/block-editor';
import { Icon } from '#/components/tiptap/ui/icon';
import { Surface } from '#/components/tiptap/ui/surface';
import { Toolbar } from '#/components/tiptap/ui/toolbar';

export interface AiState {
  isAiLoading: boolean;
  aiError?: string | null;
}

const useDarkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => setIsDarkMode(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(
    () => setIsDarkMode((isDark) => !isDark),
    [],
  );
  const lightMode = useCallback(() => setIsDarkMode(false), []);
  const darkMode = useCallback(() => setIsDarkMode(true), []);

  return {
    isDarkMode,
    toggleDarkMode,
    lightMode,
    darkMode,
  };
};

export default function Document({ params }: { params: { id: string } }) {
  const { isDarkMode, darkMode, lightMode } = useDarkmode();
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [aiToken, setAiToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1;

  const { id } = params;

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch('/api/collaboration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();

      const { token } = data;

      // set state when the data received
      setCollabToken(token);
    };

    dataFetch();
  }, []);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();

      const { token } = data;

      // set state when the data received
      setAiToken(token);
    };

    dataFetch();
  }, []);

  const ydoc = useMemo(() => new Y.Doc(), []);

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      setProvider(
        new TiptapCollabProvider({
          name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${id}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? '',
          token: collabToken,
          document: ydoc,
        }),
      );
    }
  }, [setProvider, collabToken, ydoc, id, hasCollab]);

  if ((hasCollab && (!collabToken || !provider)) || !aiToken) return;

  const DarkModeSwitcher = createPortal(
    <Surface className="fixed bottom-6 right-6 z-[99999] flex items-center gap-1 p-1">
      <Toolbar.Button onClick={lightMode} active={!isDarkMode}>
        <Icon name="Sun" />
      </Toolbar.Button>
      <Toolbar.Button onClick={darkMode} active={isDarkMode}>
        <Icon name="Moon" />
      </Toolbar.Button>
    </Surface>,
    document.body,
  );

  return (
    <>
      {DarkModeSwitcher}
      <BlockEditor
        aiToken={aiToken}
        hasCollab={hasCollab}
        ydoc={ydoc}
        provider={provider}
      />
    </>
  );
}
