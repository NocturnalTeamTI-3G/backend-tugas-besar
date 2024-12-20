import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    FileInterceptor('profile_img', {
      storage: diskStorage({
        destination: './src/user/image',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${fileExtName}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async updateCurrentUser(
    @Auth() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Body() request: UpdateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.updateCurrentUser(
      user,
      request,
      file,
    );

    return {
      data: result,
    };
  }

  // API to logout current user
  @Delete('/current')
  @HttpCode(200)
  async logoutCurrentUser(@Auth() user: User): Promise<WebResponse<boolean>> {
    await this.userService.logoutCurrentUser(user);

    return {
      data: true,
    };
  }
}
