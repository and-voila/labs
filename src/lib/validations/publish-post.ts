import { z } from 'zod';

const fileSchema =
  typeof File !== 'undefined'
    ? z.instanceof(File).or(z.string().url()).optional()
    : z.any().optional();

export const publishPostSchema = z.object({
  title: z
    .string()
    .min(15, 'Title too short. Aim for 15+ chars.')
    .max(58, 'Title too long. Keep it under 58 chars.'),
  description: z
    .string()
    .min(100, 'Add more details. 100 chars minimum.')
    .max(180, 'Too lengthy. Keep it under 180 chars.'),
  slug: z
    .string()
    .min(1, 'Need at least 1 char for slug.')
    .max(72, 'Slug too long. Max 72 chars.')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Your slug should be readable by hoomans. Only lowercase letters, numbers, and hyphens.',
    ),
  image: fileSchema,
  author: z.string().min(5, 'Invalid user ID.'),
});
