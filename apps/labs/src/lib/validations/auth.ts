import * as z from 'zod';

export const userAuthSchema = z.object({
  email: z.string().email(),
  token: z.string().optional(),
});
