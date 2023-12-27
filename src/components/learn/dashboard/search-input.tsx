'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import { Icons } from '#/components/shared/icons';
import { Input } from '#/components/ui/input';

import { useDebounce } from '#/hooks/use-debounce';

export const SearchInput = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get('categoryId');

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <div className="relative flex items-center">
      <Icons.search className="absolute left-2 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={handleChange}
        value={value}
        className="w-full rounded-lg bg-card pl-9 focus-visible:ring-ring md:w-[300px]"
        placeholder="Search for a playbook by title..."
      />
    </div>
  );
};
