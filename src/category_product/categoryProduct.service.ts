import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from '../common/validation.service';
import { PrismaService } from '../common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  CategoryProductRequest,
  CategoryProductResponse,
} from '../model/categoryProduct.model';
import { CategoryProductValidation } from './categoryProduct.validation';

@Injectable()
export class CategoryProductService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // Logic to create new category product
  async createCategoryProduct(
    request: CategoryProductRequest,
  ): Promise<CategoryProductResponse> {
    this.logger.info('CategoryProductService.createCategoryProduct');

    const category: CategoryProductRequest =
      await this.validationService.validate(
        CategoryProductValidation.CREATE,
        request,
      );

    // Create new category product
    const newCategoryProduct = await this.prismaService.categoryProduct.create({
      data: {
        name: category.name,
      },
    });

    return {
      id: newCategoryProduct.id,
      name: newCategoryProduct.name,
    };
  }

  // Logic to get all category products
  async getCategoryProducts(): Promise<CategoryProductResponse[]> {
    this.logger.info('CategoryProductService.getCategoryProducts');

    const categoryProducts =
      await this.prismaService.categoryProduct.findMany();

    if (!categoryProducts) {
      throw new HttpException('Category products not found', 404);
    }

    return categoryProducts.map((categoryProduct) => {
      return {
        id: categoryProduct.id,
        name: categoryProduct.name,
      };
    });
  }

  // Logic to get category product by id
  async getCategoryProductById(id: number): Promise<CategoryProductResponse> {
    this.logger.info('CategoryProductService.getCategoryProductById');

    const categoryProduct = await this.prismaService.categoryProduct.findUnique(
      {
        where: {
          id: id,
        },
      },
    );

    if (!categoryProduct) {
      throw new HttpException('Category product not found', 404);
    }

    return {
      id: categoryProduct.id,
      name: categoryProduct.name,
    };
  }

  // Logic to update category product
  async updateCategoryProductById(
    id: number,
    request: CategoryProductRequest,
  ): Promise<CategoryProductResponse> {
    this.logger.info('CategoryProductService.updateCategoryProductById');

    const category: CategoryProductRequest =
      await this.validationService.validate(
        CategoryProductValidation.UPDATE,
        request,
      );

    const categoryProduct = await this.prismaService.categoryProduct.findUnique(
      {
        where: {
          id: id,
        },
      },
    );

    if (!categoryProduct) {
      throw new HttpException('Category product not found', 404);
    }

    // Update category product
    const updatedCategoryProduct =
      await this.prismaService.categoryProduct.update({
        where: {
          id: id,
        },
        data: {
          name: category.name,
        },
      });

    return {
      id: updatedCategoryProduct.id,
      name: updatedCategoryProduct.name,
    };
  }

  // Logic to delete category product
}
