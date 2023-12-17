import LoadingDots from '#/components/publish/icons/loading-dots';

export default function Loading() {
  return (
    <>
      <div className="h-10 w-48 animate-pulse rounded-md bg-primary/20" />
      <div className="flex h-full w-full items-center justify-center">
        <LoadingDots />
      </div>
    </>
  );
}
