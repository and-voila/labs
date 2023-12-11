'use client';

import { Suspense } from 'react';
import { Category } from '@prisma/client';

import { CategoryItem } from '#/components/learn/dashboard/category-item';
import { CategoryItemSkeleton } from '#/components/skeletons';

interface CategoriesProps {
  items: Category[];
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto">
      <Suspense fallback={<CategoryItemSkeleton />}>
        {items.map((item) => (
          <CategoryItem key={item.id} label={item.name} value={item.id} />
        ))}
      </Suspense>
    </div>
  );
};
