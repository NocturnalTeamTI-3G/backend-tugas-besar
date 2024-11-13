import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
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
}
