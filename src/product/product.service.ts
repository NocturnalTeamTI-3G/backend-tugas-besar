import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { ProductRequest, ProductResponse } from '../model/product.model';
import { ProductValidation } from './product.validation';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
    private prismaService: PrismaService,
  ) {}

  // Logic create product
  async createProduct(
    request: ProductRequest,
    file: Express.Multer.File,
  ): Promise<ProductResponse> {
    this.logger.info(`ProductService.createProduct`);

    // Validate request
    const product: ProductRequest = this.validationService.validate(
      ProductValidation.CREATE,
      request,
    );

    if (file) {
      product.product_img = file.filename;
    }

    // Create product
    const createdProduct = await this.prismaService.product.create({
      data: {
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        nutrition: product.nutrition,
        product_img: product.product_img,
        link_product: product.link_product,
      },
    });

    return {
      id: createdProduct.id,
      category_id: createdProduct.category_id,
      name: createdProduct.name,
      nutrition: createdProduct.nutrition,
      description: createdProduct.description,
      product_img: createdProduct.product_img,
      link_product: createdProduct.link_product,
    };
  }

  // Logic to get all products
  async getAllProducts(): Promise<ProductResponse[]> {
    this.logger.info('ProductService.getAllProducts');

    const products = await this.prismaService.product.findMany({
      include: {
        category: true,
      },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      category_name: product.category.name,
      nutrition: product.nutrition,
      description: product.description,
      product_img: product.product_img,
      link_product: product.link_product,
    }));
  }

  // Logic to get product by id
  async getProductById(productId: number): Promise<ProductResponse> {
    this.logger.info(`ProductService.getProductById: ${productId}`);

    const product = await this.prismaService.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new HttpException('Product not found', 404);
    }

    return {
      id: product.id,
      name: product.name,
      category_name: product.category.name,
      nutrition: product.nutrition,
      description: product.description,
      product_img: product.product_img,
      link_product: product.link_product,
    };
  }

  // Logic to update product by id
  async updateProductById(
    productId: number,
    request: ProductRequest,
    file: Express.Multer.File,
  ): Promise<ProductResponse> {
    this.logger.info(`ProductService.updateProductById: ${productId}`);

    // Check product exists
    const existingProduct = await this.prismaService.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      throw new HttpException('Product not found', 404);
    }

    // Validate request
    const product: ProductRequest = this.validationService.validate(
      ProductValidation.UPDATE,
      request,
    );

    if (file) {
      if (
        existingProduct.product_img &&
        fs.existsSync(`./src/product/image/${existingProduct.product_img}`)
      ) {
        fs.unlinkSync(`./src/product/image/${existingProduct.product_img}`);
      }

      product.product_img = file.filename;
    }

    // Update product
    const updatedProduct = await this.prismaService.product.update({
      where: {
        id: productId,
      },
      data: product,
    });

    return {
      id: updatedProduct.id,
      category_id: updatedProduct.category_id,
      name: updatedProduct.name,
      nutrition: updatedProduct.nutrition,
      description: updatedProduct.description,
      product_img: updatedProduct.product_img,
      link_product: updatedProduct.link_product,
    };
  }

  // Logic to delete product by id
  async deleteProductById(productId: number): Promise<ProductResponse> {
    this.logger.info(`ProductService.deleteProductById: ${productId}`);

    // Check product exists
    const existingProduct = await this.prismaService.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      throw new HttpException('Product not found', 404);
    }

    if (
      existingProduct.product_img &&
      fs.existsSync(`./src/product/image/${existingProduct.product_img}`)
    ) {
      fs.unlinkSync(`./src/product/image/${existingProduct.product_img}`);
    }

    // Delete product
    await this.prismaService.product.delete({
      where: {
        id: productId,
      },
    });

    return {
      id: existingProduct.id,
      name: existingProduct.name,
      category_id: existingProduct.category_id,
      nutrition: existingProduct.nutrition,
      description: existingProduct.description,
      product_img: existingProduct.product_img,
      link_product: existingProduct.link_product,
    };
  }
}
