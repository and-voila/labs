import { Category, Course } from '@prisma/client';

import { CourseCard } from '@/app/components/learn/courses/course-card';

type FilteredCoursesWithProgressAndAccess = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  isPaidMember: boolean;
  purchased: boolean;
};

interface CoursesListProps {
  items: FilteredCoursesWithProgressAndAccess[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
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
            purchased={item.purchased}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          No courses found
        </div>
      )}
    </div>
  );
};
