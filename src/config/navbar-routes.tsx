'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CP_PREFIX } from '#/lib/const';
import { isTeacher } from '#/lib/teacher';

import { ModeToggle } from '#/components/layout/mode-toggle';
import { SearchInput } from '#/components/search-input';
import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';

export const NavbarRoutes = ({ userId }: { userId: string }) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith(`${CP_PREFIX}/admin/teacher`);
  const isCoursePage = pathname?.includes(`${CP_PREFIX}/learn/courses`);
  const isSearchPage = pathname === `${CP_PREFIX}/learn/search`;

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto flex pr-6">
        {isTeacherPage || isCoursePage ? (
          <Link href={`${CP_PREFIX}/learn`}>
            <Button size="sm" variant="outline">
              <Icons.signOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href={`${CP_PREFIX}/admin/teacher/courses`}>
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
