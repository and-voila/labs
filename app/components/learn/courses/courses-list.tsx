import { Category, Course } from '@prisma/client';

import { CourseCard } from '@/app/components/learn/courses/course-card';
import Pagination from '@/app/components/shared/pagination';

type FilteredCoursesWithProgressAndAccess = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  isPaidMember: boolean;
};

interface CoursesListProps {
  items: FilteredCoursesWithProgressAndAccess[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export const CoursesList = ({
  items,
  currentPage,
  totalPages,
  hasNextPage,
}: CoursesListProps) => {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            preview={item.preview ?? 'Oops, someone forgot to write a preview.'}
            imageUrl={item.imageUrl ?? '/images/open-graph.jpg'}
            price={item.price ?? 0}
            progress={item.progress}
            category={item.category ? item.category.name : 'Uncategorized'}
            isPaidMember={item.isPaidMember}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          No courses found
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};
