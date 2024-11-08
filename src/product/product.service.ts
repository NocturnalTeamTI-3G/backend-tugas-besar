import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { ProductRequest, ProductResponse } from '../model/product.model';
import { ProductValidation } from './product.validation';

@Injectable()
export class ProductService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
    private prismaService: PrismaService,
  ) {}

  // Logic create product
  async createProduct(request: ProductRequest): Promise<ProductResponse> {
    this.logger.info(`ProductService.createProduct: ${request}`);

    // Validate request
    const product: ProductRequest = this.validationService.validate(
      ProductValidation.CREATE,
      request,
    );

    // Create product
    const createdProduct = await this.prismaService.product.create({
      data: {
        name: product.name,
        description: product.description,
        product_img: product.product_img,
      },
    });

    return {
      id: createdProduct.id,
      name: createdProduct.name,
      description: createdProduct.description,
      product_img: createdProduct.product_img,
    };
  }

  // Logic to get all products
  async getAllProducts(): Promise<ProductResponse[]> {
    this.logger.info('ProductService.getAllProducts');

    const products = await this.prismaService.product.findMany();

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      product_img: product.product_img,
    }));
  }

  // Logic to get product by id
  async getProductById(productId: number): Promise<ProductResponse> {
    this.logger.info(`ProductService.getProductById: ${productId}`);

    const product = await this.prismaService.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new HttpException('Product not found', 404);
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      product_img: product.product_img,
    };
  }

  // Logic to update product by id
  async updateProductById(
    productId: number,
    request: ProductRequest,
  ): Promise<ProductResponse> {
    this.logger.info(
      `ProductService.updateProductById: ${productId}, ${request}`,
    );

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

    // Update product
    const updatedProduct = await this.prismaService.product.update({
      where: {
        id: productId,
      },
      data: product,
    });

    return {
      id: updatedProduct.id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      product_img: updatedProduct.product_img,
    };
  }
}
