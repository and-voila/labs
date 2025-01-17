import { create } from 'zustand';

interface PostContentState {
  sanitizedHtmlContent: string;
  setHtmlContent: (html: string) => void;
}

export const usePostContentStore = create<PostContentState>((set) => ({
  sanitizedHtmlContent: '',
  setHtmlContent: (html: string) => set({ sanitizedHtmlContent: html }),
}));
