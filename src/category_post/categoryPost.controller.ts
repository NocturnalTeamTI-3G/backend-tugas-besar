import {
  Body,
  Controller,
  Get,
  HttpCode,
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
}
