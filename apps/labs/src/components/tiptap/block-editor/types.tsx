import type { TiptapCollabProvider } from '@hocuspocus/provider';
import type { Post, Site } from '@prisma/client';
import type { Language, Tone } from '@tiptap-pro/extension-ai';
import type * as Y from 'yjs';

export interface TiptapProps {
  aiToken: string;
  hasCollab: boolean;
  ydoc: Y.Doc;
  provider?: TiptapCollabProvider | null | undefined;
  user: EditorUser;
  post: Post & { site: Site };
  teamSlug: string;
}

export interface EditorUser {
  id: string;
  displayName: string;
  image: string;
  color?: string;
  initials?: string;
}

export interface LanguageOption {
  name: string;
  label: string;
  value: Language;
}

export type AiPromptType = 'SHORTEN' | 'EXTEND' | 'SIMPLIFY' | 'TONE';

export interface AiToneOption {
  name: string;
  label: string;
  value: Tone;
}

export interface AiImageStyle {
  name: string;
  label: string;
  value: string;
}
