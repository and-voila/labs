import { TiptapCollabProvider } from '@hocuspocus/provider';
import { Post, Site } from '@prisma/client';
import { Language, Tone } from '@tiptap-pro/extension-ai';
import * as Y from 'yjs';

export interface TiptapProps {
  aiToken: string;
  hasCollab: boolean;
  ydoc: Y.Doc;
  provider?: TiptapCollabProvider | null | undefined;
  user: EditorUser;
  post: Post & { site: Site };
  teamSlug: string;
}

export type EditorUser = {
  id: string;
  displayName: string;
  image: string;
  color?: string;
  initials?: string;
};

export type LanguageOption = {
  name: string;
  label: string;
  value: Language;
};

export type AiPromptType = 'SHORTEN' | 'EXTEND' | 'SIMPLIFY' | 'TONE';

export type AiToneOption = {
  name: string;
  label: string;
  value: Tone;
};

export type AiImageStyle = {
  name: string;
  label: string;
  value: string;
};