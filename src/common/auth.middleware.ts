import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: (error?: Error | any) => void) {
    let token = req.headers['authorization'] as string;

    // If the token is in the format 'Bearer <token>
    // if (token.includes('Bearer ')) {
    //   token = token.split(' ')[1];
    // }

    if (token) {
      const user = await this.prismaService.user.findFirst({
        where: {
          token: token,
        },
      });

      if (user) {
        req.user = user;
      }
    }

    next();
  }
}
