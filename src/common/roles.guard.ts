import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from './prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let user = request.user;

    user = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new HttpException('Unauthorized access', 401);
    }

    const hasRole = roles.includes(user.role.name);
    if (!hasRole) {
      throw new HttpException('Unauthorized access', 401);
    }

    return true;
  }
}
