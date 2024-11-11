import { z, ZodType } from 'zod';

export class HistoryScanValidation {
  static readonly CREATE: ZodType = z.object({
    diseaseId: z.number(),
    productId: z.number(),
    face_img: z.string(),
  });

  static readonly UPDATE: ZodType = z.object({
    userId: z.number().optional(),
    diseaseId: z.number().optional(),
    productId: z.number().optional(),
    face_img: z.string().optional(),
  });
}
