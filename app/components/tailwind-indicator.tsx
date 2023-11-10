export function TailwindIndicator() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') return null;

  return (
    <div className="fixed bottom-6 right-56 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-brand p-3 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        sm
      </div>
      <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
      <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}
