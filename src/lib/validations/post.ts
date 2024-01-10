import { z } from 'zod';

export const newCollabPostFormSchema = z.object({
  title: z.string().min(3).max(58),
  description: z.string().min(100).max(180),
});

export type NewCollabPostFormValues = z.infer<typeof newCollabPostFormSchema>;

const fileSchema =
  typeof File !== 'undefined'
    ? z.instanceof(File).or(z.string().url()).optional()
    : z.any().optional();

export const publishPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(15, 'Need 15+ characters to give your title some zing.')
    .max(58, 'Under 58 characters keeps it snappy.'),
  description: z
    .string()
    .trim()
    .min(100, '100+ characters, please. Paint a fuller picture.')
    .max(180, '180 characters max for a quick, easy read.'),
  slug: z
    .string()
    .min(1, 'At least 1 character for a slug. Short and sweet.')
    .max(72, '72 characters max for an easy-to-remember slug.')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Just lowercase, numbers, hyphens. Keep it simple and clean.',
    ),
  image: fileSchema,
  author: z
    .string()
    .min(
      5,
      "We can't find an author. Please select one. If the problem persists, hit up support.",
    ),
});

export const updatePostSchema = publishPostSchema
  .merge(
    z.object({
      status: z.enum(['published', 'draft']).optional(),
    }),
  )
  .partial();
