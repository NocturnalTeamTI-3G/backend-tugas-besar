import { z, ZodType } from 'zod';

export class ForgotPasswordValidation {
  static readonly CREATE: ZodType = z.object({
    email: z.string().email(),
  });

  static readonly UPDATE: ZodType = z.object({
    password: z.string().min(8),
  });
}
