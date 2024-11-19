import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgotPassword.service';
import { ForgotPasswordController } from './forgotPassword.controller';

@Module({
  providers: [ForgotPasswordService],
  controllers: [ForgotPasswordController],
})
export class ForgotPasswordModule {}
