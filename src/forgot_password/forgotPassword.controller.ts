import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ForgotPasswordService } from './forgotPassword.service';
import { WebResponse } from '../model/web.model';
import {
  ForgotPasswordCheckToken,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ForgotPasswordUpdate,
} from 'src/model/forgotPassword.model';

@Controller('/api/forgot-password')
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  // API to send forgot password email
  @Post()
  @HttpCode(200)
  async sendForgotPasswordEmail(
    @Body() request: ForgotPasswordRequest,
  ): Promise<WebResponse<ForgotPasswordResponse>> {
    const response =
      await this.forgotPasswordService.sendForgotPasswordEmail(request);

    return {
      data: response,
    };
  }

  // API to check token
  @Post('/check')
  @HttpCode(200)
  async checkToken(
    @Body() request: ForgotPasswordCheckToken,
  ): Promise<WebResponse<boolean>> {
    const response = await this.forgotPasswordService.checkToken(request);

    return {
      data: response,
    };
  }

  // API to update password
  @Post('/update')
  @HttpCode(200)
  async updatePassword(
    @Body() request: ForgotPasswordUpdate,
    @Query('email') email: string,
  ) {
    if (email === undefined) {
      throw new HttpException(
        'Query parameter "email" is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.forgotPasswordService.resetPassword(
      request,
      email,
    );

    return {
      data: response,
    };
  }
}
