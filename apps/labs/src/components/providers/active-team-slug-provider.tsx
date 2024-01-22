import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';

interface ActiveTeamSlugContextValue {
  activeTeamSlug: string | null;
  setActiveTeamSlug: (slug: string | null) => void;
}

const ActiveTeamSlugContext = createContext<ActiveTeamSlugContextValue>({
  activeTeamSlug: null,
  setActiveTeamSlug: () => {},
});

export function ActiveTeamSlugProvider({ children }: { children: ReactNode }) {
  const [activeTeamSlug, setActiveTeamSlug] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const parts = pathname.split('/');
    const slug = parts[2];
    setActiveTeamSlug(slug);
  }, [pathname]);

  const value = useMemo(
    () => ({ activeTeamSlug, setActiveTeamSlug }),
    [activeTeamSlug, setActiveTeamSlug],
  );

  return (
    <ActiveTeamSlugContext.Provider value={value}>
      {children}
    </ActiveTeamSlugContext.Provider>
  );
}

export function useActiveTeamSlug() {
  const context = useContext(ActiveTeamSlugContext);
  if (context === undefined) {
    throw new Error(
      'useActiveTeamSlug must be used within a ActiveTeamSlugProvider',
    );
  }
  return context;
}
