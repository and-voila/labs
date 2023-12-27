import { useCallback } from 'react';

import { UploadDropzone } from '#/lib/uploadthing';

import { toast } from '#/components/ui/use-toast';

import { ourFileRouter } from '#/app/api/uploadthing/core';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

type FileResponse = { url: string }[];

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const handleUploadComplete = useCallback(
    (res: FileResponse) => {
      onChange(res?.[0].url);
    },
    [onChange],
  );

  const handleUploadError = useCallback((error: Error) => {
    toast({
      title: 'Unable to upload file',
      description: `Something went wrong. Please try again. If the problem persists, here's the error code for support: ${
        error?.message || 'Unknown error'
      }`,
      variant: 'destructive',
    });
  }, []);
  return (
    <UploadDropzone
      className="bg-muted p-6 ut-button:bg-primary ut-button:px-2 ut-button:text-sm ut-button:text-primary-foreground ut-allowed-content:text-muted-foreground ut-label:mb-2 ut-label:text-lg ut-label:font-semibold ut-label:text-foreground ut-upload-icon:h-16 ut-upload-icon:text-primary ut-allowed-content:ut-uploading:text-base ut-allowed-content:ut-uploading:text-foreground"
      endpoint={endpoint}
      onClientUploadComplete={handleUploadComplete}
      onUploadError={handleUploadError}
    />
  );
};
