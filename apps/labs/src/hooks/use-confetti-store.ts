import { create } from 'zustand';

interface ConfettiStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
