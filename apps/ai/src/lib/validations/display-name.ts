import * as z from 'zod';

export const displayNameSchema = z.object({
  displayName: z
    .string()
    .min(3)
    .max(25)
    .transform((name) =>
      name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
    ),
});
