import type { Language, Tone } from '@tiptap-pro/extension-ai';
import type { Editor as CoreEditor } from '@tiptap/core';
import type { EditorState } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import type { Editor } from '@tiptap/react';
import type React from 'react';

export interface AiImageStyle {
  name: string;
  label: string;
  value: string;
}

export type AiPromptType = 'SHORTEN' | 'EXTEND' | 'SIMPLIFY' | 'TONE';

export interface AiToneOption {
  name: string;
  label: string;
  value: Tone;
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

export interface MenuProps {
  editor: Editor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appendTo?: React.RefObject<any>;
  shouldHide?: boolean;
}

export interface ShouldShowProps {
  editor?: CoreEditor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
}
