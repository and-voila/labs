import * as z from 'zod';

export const userImageSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
});
