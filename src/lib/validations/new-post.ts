import { z } from 'zod';

export const newCollabPostFormSchema = z.object({
  title: z.string().min(3).max(58),
  description: z.string().min(20).max(158),
});

export type NewCollabPostFormValues = z.infer<typeof newCollabPostFormSchema>;
