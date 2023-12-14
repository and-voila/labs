import { z } from 'zod';

export const updateTeamNameFormSchema = z.object({
  name: z.string().min(3).max(50),
});

export type UpdateTeamNameFormSchema = z.infer<typeof updateTeamNameFormSchema>;
