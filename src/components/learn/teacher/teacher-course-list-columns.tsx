'use client';

import { ReactNode, useCallback } from 'react';
import Link from 'next/link';
import { Course } from '@prisma/client';
import { Column, ColumnDef } from '@tanstack/react-table';

import { APP_BP } from '#/lib/const';
import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu';

type HeaderProps = {
  column: Column<Course>;
  children: ReactNode;
  className?: string;
};

const Header = ({ column, children, className }: HeaderProps) => {
  const toggleSorting = useCallback(() => {
    column.toggleSorting(column.getIsSorted() === 'asc');
  }, [column]);

  return (
    <Button variant="ghost" onClick={toggleSorting} className={className}>
      {children}
      <Icons.caretSort className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const teacherCourseListColumns: ColumnDef<Course>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Header column={column} className="truncate md:min-w-[550px]">
        Title
      </Header>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <Header column={column}>Price</Header>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price') || '0');
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'isPublished',
    header: ({ column }) => <Header column={column}>Status</Header>,
    cell: ({ row }) => {
      const isPublished = row.getValue('isPublished') || false;

      return (
        <Badge
          className={cn(
            'pointer-events-none border-muted-foreground bg-transparent text-muted-foreground',
            isPublished && ' border-primary bg-transparent text-primary',
          )}
        >
          {isPublished ? 'Live' : 'Draft'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <div className="pr-3 md:pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Icons.dotsHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link
                href={`${APP_BP}/admin/teacher/courses/${id}`}
                prefetch={false}
              >
                <DropdownMenuItem>
                  <Icons.pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
