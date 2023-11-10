'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export const SessionInfo = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
      setUserId(session?.user?.id || null);
    };

    fetchSession();
  }, []);

  const obfuscatedUserId = userId?.substring(0, 8);

  if (!session && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    return (
      <div className="fixed bottom-6 right-6 flex rounded-lg bg-destructive p-4 text-xs">
        No session found...
      </div>
    );
  }

  return (
    <>
      {process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col rounded-lg bg-alternate/50 p-4 text-xs text-black backdrop-blur-md">
          <p className="font-mono font-bold ">For testing purposes</p>
          <pre>User ID: {obfuscatedUserId}</pre>
        </div>
      )}
    </>
  );
};
