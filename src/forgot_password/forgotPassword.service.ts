import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import {
  ForgotPasswordCheckToken,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ForgotPasswordUpdate,
} from '../model/forgotPassword.model';
import { ForgotPasswordValidation } from './forgotPassword.validation';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private mailerService: MailerService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // Logic to generate random token
  private generateRandomToken(length: number): string {
    const characters = '0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
  }

  // Logic to send forgot password email
  async sendForgotPasswordEmail(
    request: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    this.logger.info('Sending forgot email password');

    // Validate request
    const email: ForgotPasswordRequest = this.validationService.validate(
      ForgotPasswordValidation.CREATE,
      request,
    );

    const token = this.generateRandomToken(6);

    // Save token to database
    const user = await this.prismaService.user.update({
      where: {
        email: email.email,
      },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: new Date(Date.now() + 600000),
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    await this.mailerService.sendMail({
      to: email.email,
      subject: 'Skin Assist Forgot Password',
      template: './forgot-password.hbs',
      context: {
        token,
        name: user.username,
      },
    });

    return {
      email: email.email,
    };
  }

  // Logic to check token
  async checkToken(token: ForgotPasswordCheckToken): Promise<boolean> {
    this.logger.info('Checking token');

    const user = await this.prismaService.user.findFirst({
      where: {
        resetPasswordToken: token.token,
        resetPasswordExpires: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new HttpException('Invalid or expired token', 400);
    }

    return true;
  }

  // Logic to reset password
  async resetPassword(
    request: ForgotPasswordUpdate,
    email: string,
  ): Promise<boolean> {
    this.logger.info('Resetting password');

    // Validate request
    const data: ForgotPasswordUpdate = this.validationService.validate(
      ForgotPasswordValidation.UPDATE,
      request,
    );

    // Find user by token
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException('Invalid or expired token', 400);
    }

    // Update user password
    data.password = await bcrypt.hash(request.password, 10);

    await this.prismaService.user.update({
      where: {
        email: email,
      },
      data: {
        password: data.password,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return true;
  }
}
