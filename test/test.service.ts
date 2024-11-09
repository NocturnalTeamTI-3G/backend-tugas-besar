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
        gender: 'test',
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

  async createProduct() {
    await this.prismaService.product.create({
      data: {
        name: 'test',
        description: 'test',
        product_img: 'test.jpg',
      },
    });
  }

  async deleteProduct() {
    await this.prismaService.product.deleteMany({
      where: {
        name: 'test',
      },
    });
  }

  async createDisease() {
    await this.prismaService.disease.create({
      data: {
        name: 'test',
        description: 'test',
        solution: 'test',
      },
    });
  }

  async deleteDisease() {
    await this.prismaService.disease.deleteMany({
      where: {
        name: 'test',
      },
    });
  }
}
