import { Controller } from '@nestjs/common';
import { ForgotPasswordService } from './forgotPassword.service';

@Controller('/api/forgot-password')
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}
}
