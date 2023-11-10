import { Icons } from '@/app/components/shared/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet';
import { CourseMobileSidebarProps } from '@/app/lib/types';

import { CourseSidebar } from './course-sidebar';

export const CourseMobileSidebar = ({
  course,
  progressCount,
  isPaidMember,
  apiLimitCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <Icons.hamburgerMenu />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-white p-0">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          isPaidMember={isPaidMember}
          apiLimitCount={apiLimitCount}
        />
      </SheetContent>
    </Sheet>
  );
};
