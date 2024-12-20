import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryPostService } from './categoryPost.service';
import {
  CategoryPostRequest,
  CategoryPostResponse,
} from '../model/categoryPost.model';
import { WebResponse } from '../model/web.model';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('/api/category-posts')
@UseGuards(RolesGuard)
export class CategoryPostController {
  constructor(private categoryPostService: CategoryPostService) {}

  // API to create a new category post
  @Post()
  @HttpCode(200)
  @Roles('admin')
  async createCategoryPost(
    @Body() request: CategoryPostRequest,
  ): Promise<WebResponse<CategoryPostResponse>> {
    const response = await this.categoryPostService.createCategoryPost(request);

    return {
      data: response,
    };
  }

  // API to get all category posts
  @Get()
  @HttpCode(200)
  async getAllCategoryPost(): Promise<WebResponse<CategoryPostResponse[]>> {
    const response = await this.categoryPostService.getAllCategoryPost();

    return {
      data: response,
    };
  }

  // API to get a category post by id
  @Get('/:categoryPostId')
  @HttpCode(200)
  async getCategoryPostById(
    @Param('categoryPostId', ParseIntPipe) id: number,
  ): Promise<WebResponse<CategoryPostResponse>> {
    const response = await this.categoryPostService.getCategoryPostById(id);

    return {
      data: response,
    };
  }

  @Patch('/:categoryPostId')
  @HttpCode(200)
  @Roles('admin')
  async updateCategoryPost(
    @Body() request: CategoryPostRequest,
    @Param('categoryPostId', ParseIntPipe) id: number,
  ): Promise<WebResponse<CategoryPostResponse>> {
    const response = await this.categoryPostService.updateCategoryPostById(
      request,
      id,
    );

    return {
      data: response,
    };
  }

  @Delete('/:categoryPostId')
  @HttpCode(200)
  @Roles('admin')
  async deleteCategoryPost(
    @Param('categoryPostId', ParseIntPipe) id: number,
  ): Promise<WebResponse<boolean>> {
    await this.categoryPostService.deleteCategoryPostById(id);

    return { data: true };
  }
}
