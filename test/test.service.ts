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
        category_id: 1,
        nutrition: 'test',
        description: 'test',
        product_img: 'test.jpg',
        link_product: 'test',
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

  async createCategoryProduct() {
    await this.prismaService.categoryProduct.create({
      data: {
        name: 'test',
      },
    });
  }

  async deleteCategoryProduct() {
    await this.prismaService.categoryProduct.deleteMany({
      where: {
        name: 'test',
      },
    });
  }

  async getCategoryProductId(): Promise<number> {
    const categoryProduct = await this.prismaService.categoryProduct.findFirst({
      where: {
        name: 'test',
      },
    });

    return categoryProduct.id;
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

  async getDiseaseById(): Promise<number> {
    const disease = await this.prismaService.disease.findFirst({
      where: {
        name: 'test',
      },
    });

    return disease.id;
  }

  // Create a history scan
  async createHistoryScan() {
    await this.prismaService.historyScan.create({
      data: {
        user_id: 328,
        disease_id: 1,
        product_id: 1,
        face_img: 'test.jpg',
      },
    });
  }

  async deleteHistoryScan() {
    await this.prismaService.historyScan.deleteMany({
      where: {
        face_img: 'test.jpg',
      },
    });
  }

  async getHistoryScanId(): Promise<number> {
    const historyScan = await this.prismaService.historyScan.findFirst({
      where: {
        face_img: 'test.jpg',
      },
    });

    return historyScan.id;
  }
}
