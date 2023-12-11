'use client';

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import { Chapter } from '@prisma/client';
import { useEffect, useState } from 'react';

import { Icons } from '#/components/shared/icons';
import { Badge } from '#/components/ui/badge';
import { cn } from '#/lib/utils';

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      'mb-4 flex items-center gap-x-2 rounded-md border bg-transparent text-sm text-muted-foreground',
                      chapter.isPublished && 'border bg-card text-foreground',
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        'rounded-l-md border-r border-r-muted-foreground px-2 py-3 text-muted-foreground transition hover:bg-muted-foreground hover:text-primary-foreground',
                        chapter.isPublished &&
                          'border-r-primary text-primary hover:bg-primary',
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Icons.drag className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto flex items-center gap-x-2 pr-2">
                      <Badge
                        className={cn(
                          'pointer-events-none border border-border bg-transparent text-muted-foreground',
                          chapter.isPublished &&
                            'pointer-events-none border-primary bg-transparent text-primary',
                        )}
                      >
                        {chapter.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                      <Icons.pencil
                        onClick={() => onEdit(chapter.id)}
                        className="ml-2 h-4 w-4 cursor-pointer transition hover:opacity-75"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
