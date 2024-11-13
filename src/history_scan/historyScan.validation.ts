import { z, ZodType } from 'zod';

export class HistoryScanValidation {
  static readonly CREATE: ZodType = z.object({
    diseaseId: z.number(),
    categoryProductId: z.number(),
  });

  static readonly UPDATE: ZodType = z.object({
    userId: z.number().optional(),
    diseaseId: z.number().optional(),
    categoryProductId: z.number().optional(),
    face_img: z.string().optional(),
  });
}
