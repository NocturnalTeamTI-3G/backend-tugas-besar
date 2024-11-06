import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from 'src/model/web.model';
import { RegisterUserRequest, UserResponse } from 'src/model/user.model';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  // API to register a new user
  @Post()
  async registerUser(
    @Body() request: RegisterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);

    return {
      data: result,
    };
  }
}