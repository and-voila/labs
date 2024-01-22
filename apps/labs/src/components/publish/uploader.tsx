'use client';

import type { ChangeEvent } from 'react';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@and-voila/ui/button';
import { Icons } from '@and-voila/ui/icons';
import { toast } from '@and-voila/ui/use-toast';

export default function Uploader() {
  const [data, setData] = useState<{
    image: string | null;
  }>({
    image: null,
  });
  const [file, setFile] = useState<File | null>(null);

  const [dragActive, setDragActive] = useState(false);

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast({
            title: 'Upload size exceeded',
            description:
              "Your upload failed because it's too big. Please try again with a smaller file. The max is 50MB.",
            variant: 'destructive',
          });
        } else {
          setFile(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }));
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [setData],
  );

  const [saving, setSaving] = useState(false);

  const saveDisabled = useMemo(() => {
    return !data.image || saving;
  }, [data.image, saving]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size / 1024 / 1024 > 5) {
        toast({
          title: 'Upload size exceeded',
          description: 'The max upload size is 5MB. Please try a smaller file.',
          variant: 'destructive',
        });
      } else {
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setData((prev) => ({
            ...prev,
            image: e.target?.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSaving(true);
      fetch('/api/upload', {
        method: 'POST',
        headers: { 'content-type': file?.type ?? 'application/octet-stream' },
        body: file,
      })
        .then(async (res) => {
          if (res.ok) {
            const { url } = await res.json();
            toast({
              title: 'File uploaded!',
              description: `Your file has been uploaded to ${url}`,
              variant: 'success',
            });
          } else {
            throw new Error('Upload failed');
          }
        })
        .catch((error) => {
          toast({
            title: 'An error occurred',
            description: `${error.message}. Please try again.`,
            variant: 'destructive',
          });
        })
        .finally(() => {
          setSaving(false);
        });
    },
    [file],
  );

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div>
        <div className="mb-4 space-y-1">
          <h2 className="text-xl font-semibold">Upload a file</h2>
          <p className="text-sm text-muted-foreground">
            Accepted formats: .png, .jpg, .gif, .mp4
          </p>
        </div>
        <label
          htmlFor="image-upload"
          className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border bg-background shadow-sm transition-all hover:bg-background/70"
        >
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
          <div
            className={`${
              dragActive ? 'border' : ''
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
              data.image
                ? 'bg-background opacity-0 hover:opacity-100 hover:backdrop-blur-md'
                : 'bg-background opacity-100 hover:bg-background/80'
            }`}
          >
            <svg
              className={`${
                dragActive ? 'scale-110' : 'scale-100'
              } h-7 w-7 text-primary transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m16 16-4-4-4 4" />
            </svg>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Drag and drop or click to upload.
            </p>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Max file size: 5MB
            </p>
            <span className="sr-only">Photo upload</span>
          </div>
          {data.image && (
            <img
              src={data.image}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onChangePicture}
          />
        </div>
      </div>

      <Button disabled={saveDisabled}>
        {saving ? (
          <>
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Just a sec
          </>
        ) : (
          <p className="text-sm">Confirm upload</p>
        )}
      </Button>
    </form>
  );
}
