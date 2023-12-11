'use client';

import '#/components/quill.css';
import 'react-quill/dist/quill.bubble.css';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  );

  return (
    <ReactQuill className="myQuill" theme="bubble" value={value} readOnly />
  );
};
