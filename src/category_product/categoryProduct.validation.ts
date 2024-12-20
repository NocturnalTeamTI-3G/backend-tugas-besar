import { z, ZodType } from 'zod';

export class CategoryProductValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(50),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(50).optional(),
  });
}
