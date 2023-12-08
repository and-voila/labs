import * as z from 'zod';

export const userEmailSchema = z.object({
  email: z.string().email(),
});
