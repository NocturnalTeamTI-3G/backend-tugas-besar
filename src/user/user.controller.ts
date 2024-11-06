import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from '../model/web.model';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../model/user.model';
import { User } from '@prisma/client';
import { Auth } from '../common/auth.decorator';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  // API to register a new user
  @Post()
  @HttpCode(200)
  async registerUser(
    @Body() request: RegisterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);

    return {
      data: result,
    };
  }

  // API to login a user
  @Post('/login')
  @HttpCode(200)
  async loginUser(
    @Body() request: LoginUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.login(request);

    return {
      data: result,
    };
  }

  // API to get current user
  @Get('/current')
  @HttpCode(200)
  async getCurrentUser(@Auth() user: User): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.getCurrentUser(user);

    return {
      data: result,
    };
  }

  // API to update user
  @Patch('/current')
  @HttpCode(200)
  async updateCurrentUser(
    @Auth() user: User,
    @Body() request: UpdateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.updateCurrentUser(user, request);

    return {
      data: result,
    };
  }

  @Delete('/current')
  @HttpCode(200)
  async logoutCurrentUser(@Auth() user: User): Promise<WebResponse<boolean>> {
    await this.userService.logoutCurrentUser(user);

    return {
      data: true,
    };
  }
}
