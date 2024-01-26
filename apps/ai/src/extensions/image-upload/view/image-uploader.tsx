import type { ChangeEvent } from 'react';

import { useCallback } from 'react';

import { cn } from '@av/ui';

import { Button } from '#/components/tiptap/editor-button';
import { Icon } from '#/components/tiptap/icon';
import { Spinner } from '#/components/tiptap/spinner';

import { useDropZone, useFileUpload, useUploader } from './hooks';

export const ImageUploader = ({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) => {
  const { loading, uploadFile } = useUploader({ onUpload });
  const { handleUploadClick, ref } = useFileUpload();
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({
    // TODO: Review and fix this
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    uploader: uploadFile,
  });

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      // @ts-expect-error TODO:
      e.target.files ? uploadFile(e.target.files[0]) : null,
    [uploadFile],
  );

  if (loading) {
    return (
      <div className="flex min-h-[10rem] items-center justify-center rounded-lg bg-opacity-80 p-8">
        <Spinner className="text-primary" size={1.5} />
      </div>
    );
  }

  const wrapperClass = cn(
    'flex flex-col items-center justify-center rounded-lg bg-opacity-80 px-8 py-10',
    draggedInside && 'bg-secondary',
  );

  return (
    <div
      className={wrapperClass}
      onDrop={onDrop}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      contentEditable={false}
    >
      <Icon name="Image" className="mb-4 h-12 w-12 text-primary/80" />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-center text-sm font-medium text-muted-foreground">
          {draggedInside ? 'Drop image here' : 'Drag and drop or'}
        </div>
        <div>
          <Button
            disabled={draggedInside}
            onClick={handleUploadClick}
            variant="primary"
            buttonSize="small"
          >
            <Icon name="Upload" />
            Upload an image
          </Button>
        </div>
      </div>
      <input
        className="h-0 w-0 overflow-hidden opacity-0"
        ref={ref}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.gif"
        onChange={onFileChange}
      />
    </div>
  );
};

export default ImageUploader;
