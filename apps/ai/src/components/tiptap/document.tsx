'use client';

import { TiptapCollabProvider } from '@hocuspocus/provider';

import 'iframe-resizer/js/iframeResizer.contentWindow';

import { env } from '#/env';

import type { Post, Site } from '@prisma/client';

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as Y from 'yjs';

import type { EditorUser } from '@av/editor/types';

import AiEditor from './ai-editor';

export interface AiState {
  isAiLoading: boolean;
  aiError?: string | null;
}

interface DocumentProps {
  post: Post & { site: Site };
  user: EditorUser;
  teamSlug: string;
}

export default function Document({ post, user, teamSlug }: DocumentProps) {
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [aiToken, setAiToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const hasCollab = parseInt(searchParams.get('noCollab')!) !== 1;

  const postId = post.id;

  useEffect(() => {
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

      setCollabToken(token);
    };
    // TODO: Check if this is ok or need to use catch
    void dataFetch();
  }, []);

  useEffect(() => {
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

      setAiToken(token);
    };
    // TODO: Check if this is ok or need to use catch
    void dataFetch();
  }, []);

  const ydoc = useMemo(() => new Y.Doc(), []);

  useLayoutEffect(() => {
    let provider: TiptapCollabProvider | null = null;

    if (hasCollab && collabToken) {
      provider = new TiptapCollabProvider({
        name: `${env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${postId}`,
        appId: env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? '',
        token: collabToken,
        document: ydoc,
      });

      setProvider(provider);
    }

    return () => {
      if (provider) {
        provider.destroy();
      }
    };
  }, [setProvider, collabToken, ydoc, postId, hasCollab]);

  if ((hasCollab && (!collabToken || !provider)) || !aiToken) return;

  return (
    <>
      <AiEditor
        aiToken={aiToken}
        hasCollab={hasCollab}
        ydoc={ydoc}
        provider={provider}
        user={user}
        post={post}
        teamSlug={teamSlug}
      />
    </>
  );
}
