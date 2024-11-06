import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    role_id: z.number().int().positive(),
    username: z.string().min(1).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    profile_img: z.string(),
  });
}
