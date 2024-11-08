import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        email: 'test@gmail.com',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        password: await bcrypt.hash('testtest', 10),
        email: 'test@gmail.com',
        profile_img: 'test.jpg',
        role_id: 1,
        token: 'test',
      },
    });
  }

  async deleteRole() {
    await this.prismaService.role.deleteMany({
      where: {
        name: 'test',
      },
    });
  }

  async createRole() {
    await this.prismaService.role.create({
      data: {
        name: 'test',
      },
    });
  }
}
