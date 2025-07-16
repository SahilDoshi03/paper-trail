import { z } from 'zod';

export const FontQuerySchema = z.object({
  sort: z.string().optional(),
  query: z.string().optional(),
});
