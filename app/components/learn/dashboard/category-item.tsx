'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import { cn } from '@/app/lib/utils';

interface CategoryItemProps {
  label: string;
  value?: string;
}

export const CategoryItem = ({ label, value }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get('categoryId');
  const currentTitle = searchParams.get('title');

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-1 rounded-lg border px-3 py-1 font-mono text-sm transition hover:border-brand hover:bg-brand/20',
        isSelected && 'border-brand bg-brand/20 font-semibold text-foreground',
      )}
      type="button"
    >
      <div className="truncate">{label}</div>
    </button>
  );
};
