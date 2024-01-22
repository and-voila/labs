import * as z from 'zod';

export const ogImageSchema = z.object({
  title: z.string(),
});
