'use client';

import type { ReactNode } from 'react';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import Modal from '.';

interface ModalContextProps {
  show: (content: ReactNode) => void;
  hide: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [showModal, setShowModal] = useState(false);

  const show = useCallback((content: ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  }, []);

  const hide = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      setModalContent(null);
    }, 300);
  }, []);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          {modalContent}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
