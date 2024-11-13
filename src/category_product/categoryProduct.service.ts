import { Inject, Injectable } from '@nestjs/common';
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
}
