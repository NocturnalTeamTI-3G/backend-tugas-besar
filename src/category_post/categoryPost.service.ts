import { HttpException, Inject, Injectable } from '@nestjs/common';
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

  // Logic to get all category posts
  async getAllCategoryPost(): Promise<CategoryPostResponse[]> {
    this.logger.info('CategoryPostService.getAllCategoryPost');

    // Get all category posts
    const categoryPosts = await this.prismaService.categoryPost.findMany();

    return categoryPosts.map((categoryPost) => {
      return {
        id: categoryPost.id,
        name: categoryPost.name,
      };
    });
  }

  // Logic to get category post by id
  async getCategoryPostById(id: number): Promise<CategoryPostResponse> {
    this.logger.info('CategoryPostService.getCategoryPostById');

    // Get category post by id
    const categoryPost = await this.prismaService.categoryPost.findUnique({
      where: {
        id: id,
      },
    });

    if (!categoryPost) {
      throw new HttpException('Category post not found', 404);
    }

    return {
      id: categoryPost.id,
      name: categoryPost.name,
    };
  }

  // Logic to update category post by id
  async updateCategoryPostById(
    request: CategoryPostRequest,
    id: number,
  ): Promise<CategoryPostResponse> {
    this.logger.info('CategoryPostService.updateCategoryPostById');

    // Check if category post exists
    const categoryPostExists = await this.prismaService.categoryPost.findUnique(
      {
        where: {
          id: id,
        },
      },
    );

    if (!categoryPostExists) {
      throw new HttpException('Category post not found', 404);
    }

    // Validate the request
    const categoryPost = this.validationService.validate(
      CategoryPostValidation.UPDATE,
      request,
    );

    // Update category post by id
    const updatedCategoryPost = await this.prismaService.categoryPost.update({
      where: {
        id: id,
      },
      data: {
        name: categoryPost.name,
      },
    });

    return {
      id: updatedCategoryPost.id,
      name: updatedCategoryPost.name,
    };
  }

  // Logic to delete category post by id
  async deleteCategoryPostById(id: number): Promise<boolean> {
    this.logger.info('CategoryPostService.deleteCategoryPostById');

    // Check if category post exists
    const categoryPostExists = await this.prismaService.categoryPost.findUnique(
      {
        where: {
          id: id,
        },
      },
    );

    if (!categoryPostExists) {
      throw new HttpException('Category post not found', 404);
    }

    // Delete category post by id
    await this.prismaService.categoryPost.delete({
      where: {
        id: id,
      },
    });

    return true;
  }
}
