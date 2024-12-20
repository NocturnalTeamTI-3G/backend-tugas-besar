import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    role_id: z.number().int().positive(),
    username: z.string().min(1).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    gender: z.string().min(1).max(10),
    profile_img: z.string().optional(),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
  });

  static readonly UPDATE: ZodType = z.object({
    role_id: z.number().int().positive().optional(),
    username: z.string().min(1).max(255).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(255).optional(),
    gender: z.string().min(1).max(10).optional(),
    profile_img: z.string().optional(),
  });
}
