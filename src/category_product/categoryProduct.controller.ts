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
import { CategoryProductService } from './categoryProduct.service';
import {
  CategoryProductRequest,
  CategoryProductResponse,
} from '../model/categoryProduct.model';
import { WebResponse } from '../model/web.model';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';

@Controller('/api/category-products')
@UseGuards(RolesGuard)
export class CategoryProductController {
  constructor(private productCategoryService: CategoryProductService) {}

  // API to create new category product
  @Post()
  @HttpCode(200)
  @Roles('admin')
  async createCategoryProduct(
    @Body() request: CategoryProductRequest,
  ): Promise<WebResponse<CategoryProductResponse>> {
    const categoryProduct =
      await this.productCategoryService.createCategoryProduct(request);

    return {
      data: categoryProduct,
    };
  }

  // API to get all category products
  @Get()
  @HttpCode(200)
  async getAllCategoryProducts(): Promise<
    WebResponse<CategoryProductResponse[]>
  > {
    const categoryProducts =
      await this.productCategoryService.getCategoryProducts();

    return {
      data: categoryProducts,
    };
  }

  // API to get category product by id
  @Get('/:categoryId')
  @HttpCode(200)
  async getCategoryProductById(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<WebResponse<CategoryProductResponse>> {
    const categoryProduct =
      await this.productCategoryService.getCategoryProductById(categoryId);

    return {
      data: categoryProduct,
    };
  }

  // API to update category product by id
  @Patch('/:categoryId')
  @HttpCode(200)
  @Roles('admin')
  async updateCategoryProductById(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() request: CategoryProductRequest,
  ): Promise<WebResponse<CategoryProductResponse>> {
    const categoryProduct =
      await this.productCategoryService.updateCategoryProductById(
        categoryId,
        request,
      );

    return {
      data: categoryProduct,
    };
  }

  // API to delete category product by id
  @Delete('/:categoryId')
  @HttpCode(200)
  @Roles('admin')
  async deleteCategoryProductById(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<WebResponse<boolean>> {
    const response =
      await this.productCategoryService.deleteCategoryProductById(categoryId);

    return {
      data: response,
    };
  }
}
