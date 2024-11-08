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
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { WebResponse } from '../model/web.model';
import { ProductRequest, ProductResponse } from '../model/product.model';
import { ProductService } from './product.service';
import { Auth } from '../common/auth.decorator';

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
    @Auth() user: any,
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
}
