import { createId } from '@paralleldrive/cuid2';
import { nanoid } from 'nanoid';

// ::: For trivial id generation ::: //
export const generateNanoId = (prefix?: string): string => {
  const id = nanoid(10);

  return prefix ? `${prefix}_${id}` : id;
};

// ::: For non-trivial collision resistant ::: //
export const generateCuid2Id = (): string => {
  return createId();
};
