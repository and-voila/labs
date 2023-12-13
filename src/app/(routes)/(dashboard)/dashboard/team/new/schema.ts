import { z } from 'zod';

export const newTeamFormSchema = z.object({
  name: z.string().min(3).max(23),
});

export type NewTeamFormValues = z.infer<typeof newTeamFormSchema>;
