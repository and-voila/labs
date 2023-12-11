'use client';

import { UploadDropzone } from '#/lib/uploadthing';
import { toast } from '#/components/ui/use-toast';
import { ourFileRouter } from '#/api/uploadthing/core';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      className="bg-muted p-6 ut-button:bg-primary ut-button:px-2 ut-button:text-sm ut-allowed-content:text-muted-foreground ut-label:mb-2 ut-label:text-lg ut-label:font-semibold ut-label:text-foreground ut-upload-icon:h-16 ut-upload-icon:text-primary ut-allowed-content:ut-uploading:text-base ut-allowed-content:ut-uploading:text-foreground"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast({
          title: 'Unable to upload file',
          description: `Something went wrong. Please try again. If the problem persists, here's the error code for support: ${
            error?.message || 'Unknown error'
          }`,
          variant: 'destructive',
        });
      }}
    />
  );
};
