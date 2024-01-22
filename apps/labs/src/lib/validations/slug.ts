import * as z from 'zod';

export const teamSlugSchema = z
  .string()
  .min(3, { message: 'Workspace name must be at least 3 characters' })
  .max(25, { message: 'Workspace name cannot exceed 25 characters' });
