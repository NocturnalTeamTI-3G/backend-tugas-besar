import { z, ZodType } from 'zod';

export class DiseaseValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(255),
    description: z.string(),
    solution: z.string(),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    solution: z.string().optional(),
  });
}
