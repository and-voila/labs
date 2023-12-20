'use client';

import '#/components/quill.css';
import 'react-quill/dist/quill.bubble.css';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

interface PreviewProps {
  value: string;
}

export const QuillPreview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  );

  return (
    <ReactQuill className="myQuill" theme="bubble" value={value} readOnly />
  );
};
