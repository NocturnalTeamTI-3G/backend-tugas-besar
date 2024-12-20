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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { WebResponse } from '../model/web.model';
import { ProductRequest, ProductResponse } from '../model/product.model';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('/api/products')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  // API to create a new product
  @Post()
  @Roles('admin')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('product_img', {
      storage: diskStorage({
        destination: './src/product/image',
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtName}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async createProduct(
    @Body() request: ProductRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<WebResponse<ProductResponse>> {
    request.category_id = Number(request.category_id);
    const newProduct = await this.productService.createProduct(request, file);

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
  @UseInterceptors(
    FileInterceptor('product_img', {
      storage: diskStorage({
        destination: './src/product/image',
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtName}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async updateProductById(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() request: ProductRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<WebResponse<ProductResponse>> {
    request.category_id = Number(request.category_id);
    const product = await this.productService.updateProductById(
      productId,
      request,
      file,
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
