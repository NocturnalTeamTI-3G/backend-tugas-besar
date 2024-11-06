import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../model/user.model';
import { Logger } from 'winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  // Logic to register a new user
  async register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.debug(`Registering a new user: ${JSON.stringify(request)}`);
    const registerRequest: RegisterUserRequest =
      this.validationService.validate(UserValidation.REGISTER, request);

    const totalUserWithSameEmail = await this.prismaService.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserWithSameEmail != 0) {
      throw new HttpException('Email already exists', 400);
    }

    // Convert password to bcrypt
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    // Create new user
    const newUser = await this.prismaService.user.create({
      data: registerRequest,
    });

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      profile_img: newUser.profile_img,
      role_id: newUser.role_id,
      created_at: newUser.created_at,
    };
  }

  // Logic login user
  async login(request: LoginUserRequest): Promise<UserResponse> {
    this.logger.debug(`UserService.login: ${JSON.stringify(request)}`);
    const loginRequest: LoginUserRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    // Find user by email
    let user = await this.prismaService.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new HttpException('Email or Password is invalid', 401);
    }

    // Compare Password
    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Email or Password is invalid', 401);
    }

    // Generate token with uuid
    user = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: uuid(),
      },
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profile_img: user.profile_img,
      role_id: user.role_id,
      token: user.token,
    };
  }

  // Logic to get current user
  async getCurrentUser(user: User): Promise<UserResponse> {
    return {
      id: user.id,
      role_id: user.role_id,
      username: user.username,
      email: user.email,
      profile_img: user.profile_img,
    };
  }

  // Logic to update user current
  async updateCurrentUser(
    user: User,
    request: RegisterUserRequest,
  ): Promise<UserResponse> {
    this.logger.debug(
      `UserService.updateUserCurrent: ${JSON.stringify(request)}`,
    );
    const updateUser: UpdateUserRequest = this.validationService.validate(
      UserValidation.UPDATE,
      request,
    );

    if (updateUser.password) {
      // Convert password to bcrypt
      updateUser.password = await bcrypt.hash(updateUser.password, 10);
    }

    // Update user
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: updateUser,
    });

    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      profile_img: updatedUser.profile_img,
      role_id: updatedUser.role_id,
    };
  }

  // Logic to logout current user
  async logoutCurrentUser(user: User): Promise<UserResponse> {
    this.logger.debug(`UserService.logoutCurrentUser: ${user.id}`);

    // update token to null
    const result = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
      },
    });

    return {
      id: result.id,
      username: result.username,
      email: result.email,
      profile_img: result.profile_img,
      role_id: result.role_id,
    };
  }
}
