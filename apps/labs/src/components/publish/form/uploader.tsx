'use client';

import { useCallback, useRef, useState } from 'react';

import { cn } from '#/lib/utils';

import { toast } from '#/components/ui/use-toast';

export default function Uploader({
  defaultValue,
  name,
  onChange,
}: {
  defaultValue: string | null;
  name: 'image' | 'logo';
  onChange?: (value: string | null) => void;
}) {
  const aspectRatio = name === 'image' ? 'aspect-video' : 'aspect-square';

  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState({
    [name]: defaultValue,
  });

  const [dragActive, setDragActive] = useState(false);

  const handleUpload = useCallback(
    (file: File | null) => {
      if (file) {
        if (file.size / 1024 / 1024 > 5) {
          toast({
            title: 'Upload size exceeded',
            description: 'The max upload size is 5MB. Please try again.',
            variant: 'destructive',
          });
        } else if (
          !file.type.includes('png') &&
          !file.type.includes('jpg') &&
          !file.type.includes('jpeg')
        ) {
          toast({
            title: 'Invalid file type',
            description:
              'At this time we only support .png, .jpg, or .jpeg. Please try again',
            variant: 'destructive',
          });
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            setData((prev) => ({
              ...prev,
              [name]: e.target?.result as string,
            }));
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [name],
  );

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

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      // TODO: Check null safety
      const file = e.dataTransfer.files?.[0] ?? null;
      inputRef.current!.files = e.dataTransfer.files;
      handleUpload(file);
    },
    [handleUpload],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // TODO: Check null safety
      const file = e.currentTarget.files?.[0] ?? null;
      handleUpload(file);
      if (onChange) {
        const newValue = file ? URL.createObjectURL(file) : null;
        onChange(newValue);
      }
    },
    [handleUpload, onChange],
  );

  return (
    <div>
      <label
        htmlFor={`${name}-upload`}
        className={cn(
          'group relative mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border bg-background shadow-sm transition-all hover:bg-background/70',
          aspectRatio,
          {
            'max-w-screen-md': aspectRatio === 'aspect-video',
            'max-w-xs': aspectRatio === 'aspect-square',
          },
        )}
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
            data[name]
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
        {data[name] && (
          <img
            src={data[name]!}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
        )}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          id={`${name}-upload`}
          ref={inputRef}
          name={name}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
