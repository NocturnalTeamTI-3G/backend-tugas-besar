import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { RegisterUserRequest, UserResponse } from '../model/user.model';
import { Logger } from 'winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  // Logic to register a new user
  async register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.info(`Registering a new user: ${JSON.stringify(request)}`);
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
}
