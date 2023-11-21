'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export const SessionInfo = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  const obfuscatedUserId = session?.user?.id?.substring(0, 8);

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') return null;

  return (
    <div className="fixed bottom-56 right-6 z-50 flex flex-col rounded-lg border border-brand bg-card p-2 text-xs text-foreground">
      <span className="block sm:hidden">xs</span>
      <span className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        sm
      </span>
      <span className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</span>
      <span className="hidden lg:block xl:hidden 2xl:hidden">lg</span>
      <span className="hidden xl:block 2xl:hidden">xl</span>
      <span className="hidden 2xl:block">2xl</span>

      {session ? (
        <>
          <pre>{obfuscatedUserId}</pre>
        </>
      ) : (
        <div className="text-destructive">No session found...</div>
      )}
    </div>
  );
};
