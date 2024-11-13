import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
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

  // API to delete category product by id
}
