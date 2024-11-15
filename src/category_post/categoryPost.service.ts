import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import {
  CategoryPostRequest,
  CategoryPostResponse,
} from '../model/categoryPost.model';
import { CategoryPostValidation } from './categoryPost.validation';

@Injectable()
export class CategoryPostService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // Logic to create a new category post
  async createCategoryPost(
    request: CategoryPostRequest,
  ): Promise<CategoryPostResponse> {
    this.logger.info('CategoryPostService.createCategoryPost');

    // Validate the request
    const categoryPost = this.validationService.validate(
      CategoryPostValidation.CREATE,
      request,
    );

    // Create a new category post
    const newCategoryPost = await this.prismaService.categoryPost.create({
      data: {
        name: categoryPost.name,
      },
    });

    return {
      id: newCategoryPost.id,
      name: newCategoryPost.name,
      created_at: newCategoryPost.created_at,
    };
  }
}
