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
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { WebResponse } from '../model/web.model';
import { ProductRequest, ProductResponse } from '../model/product.model';
import { ProductService } from './product.service';

@Controller('/api/products')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  // API to create a new product
  @Post()
  @Roles('admin')
  @HttpCode(200)
  async createProduct(
    @Body() request: ProductRequest,
  ): Promise<WebResponse<ProductResponse>> {
    const newProduct = await this.productService.createProduct(request);

    return {
      data: newProduct,
    };
  }

  // API to get all products
  @Get()
  @HttpCode(200)
  async getAllProducts(): Promise<WebResponse<ProductResponse[]>> {
    const products = await this.productService.getAllProducts();

    return {
      data: products,
    };
  }

  // API to get product by id
  @Get('/:productId')
  @HttpCode(200)
  async getProductById(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<WebResponse<ProductResponse>> {
    const product = await this.productService.getProductById(productId);

    return {
      data: product,
    };
  }

  // API to update product by id
  @Patch('/:productId')
  @Roles('admin')
  @HttpCode(200)
  async updateProductById(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() request: ProductRequest,
  ): Promise<WebResponse<ProductResponse>> {
    const product = await this.productService.updateProductById(
      productId,
      request,
    );

    return {
      data: product,
    };
  }

  // API to delete product by id
  @Delete('/:productId')
  @Roles('admin')
  @HttpCode(200)
  async deleteProductById(@Param('productId', ParseIntPipe) productId: number) {
    await this.productService.deleteProductById(productId);

    return {
      message: true,
    };
  }
}
