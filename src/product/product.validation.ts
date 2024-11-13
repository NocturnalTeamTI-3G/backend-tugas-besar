import { z, ZodType } from 'zod';

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(255),
    description: z.string(),
    product_img: z.string(),
    nutrition: z.string(),
    category_id: z.number(),
    link_product: z.string(),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    product_img: z.string().optional(),
    nutrition: z.string().optional(),
    category_id: z.number().optional(),
    link_product: z.string().optional(),
  });
}
