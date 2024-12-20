import { z, ZodType } from 'zod';

export class PostValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    category_id: z.number().int(),
  });

  static readonly UPDATE: ZodType = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    category_id: z.number().int().optional(),
  });
}
