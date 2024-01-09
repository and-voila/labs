import { TiptapCollabProvider } from '@hocuspocus/provider';
import { Language } from '@tiptap-pro/extension-ai';
import * as Y from 'yjs';

import { PostWithSite } from '#/components/publish/editor/editor';

export interface TiptapProps {
  aiToken: string;
  hasCollab: boolean;
  ydoc: Y.Doc;
  provider?: TiptapCollabProvider | null | undefined;
  user: EditorUser;
  post: PostWithSite;
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

export type AiTone =
  | 'academic'
  | 'business'
  | 'casual'
  | 'childfriendly'
  | 'conversational'
  | 'emotional'
  | 'humorous'
  | 'informative'
  | 'inspirational'
  | string;

export type AiPromptType = 'SHORTEN' | 'EXTEND' | 'SIMPLIFY' | 'TONE';

export type AiToneOption = {
  name: string;
  label: string;
  value: AiTone;
};

export type AiImageStyle = {
  name: string;
  label: string;
  value: string;
};
