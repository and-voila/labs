'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ModeToggle } from '@/app/components/layout/mode-toggle';
import { SearchInput } from '@/app/components/search-input';
import { Icons } from '@/app/components/shared/icons';
import { Button } from '@/app/components/ui/button';
import { isTeacher } from '@/app/lib/teacher';

export const NavbarRoutes = ({ userId }: { userId: string }) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/learn/teacher');
  const isCoursePage = pathname?.includes('/learn/courses');
  const isSearchPage = pathname === '/learn/search';

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto flex pr-6">
        {isTeacherPage || isCoursePage ? (
          <Link href="/learn">
            <Button size="sm" variant="outline">
              <Icons.signOut className="mr-2 h-4 w-4" />
              {isTeacherPage ? 'Exit teacher mode' : 'Exit playbook'}
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/learn/teacher/courses">
            <Button size="sm" variant="outline">
              Teacher mode
            </Button>
          </Link>
        ) : null}
      </div>
      <div className="mr-3 flex items-center gap-x-3">
        <ModeToggle />
        <Link
          href="https://discord.com/channels/1151749282806910976/1164902538731069542"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Navigate to And Voila Discord in a new window."
        >
          <Icons.discord className="h-6 w-6 text-foreground/80" />
        </Link>
      </div>
    </>
  );
};