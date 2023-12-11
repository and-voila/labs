import Link from 'next/link';

import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { buttonVariants } from '#/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPagesToShow = () => {
    let startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const pages = getPagesToShow();

  return (
    <div className="flex items-center justify-center space-x-2 py-6">
      <Link
        href={`?page=${Math.max(currentPage - 1, 1)}`}
        className={cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          currentPage === 1 ? 'pointer-events-none opacity-50' : '',
        )}
      >
        <Icons.caretLeft className="mr-2 h-3 w-3 text-primary" />
        Prev
      </Link>

      <nav
        aria-label="Pagination"
        className="relative z-0 inline-flex space-x-1 rounded-md"
      >
        {pages.map((p) => (
          <Link
            key={p}
            href={`?page=${p}`}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              p === currentPage ? 'pointer-events-none bg-primary/20' : '',
            )}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </Link>
        ))}
      </nav>

      <Link
        href={`?page=${Math.min(currentPage + 1, totalPages)}`}
        className={cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          !hasNextPage ? 'pointer-events-none opacity-50' : '',
        )}
      >
        Next
        <Icons.caretRight className="ml-2 h-3 w-3 text-primary" />
      </Link>
    </div>
  );
};

export default Pagination;
