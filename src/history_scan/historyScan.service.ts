import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { User } from '@prisma/client';
import { HistoryScanResponse } from '../model/historyScan.model';
import * as fs from 'fs';
import * as FormData from 'form-data';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HistoryScanService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  // Logic to create a new history
  async createHistoryScan(
    user: User,
    file_img: Express.Multer.File,
  ): Promise<HistoryScanResponse> {
    this.logger.info('HistoryScanService.createHistoryScan');

    // Get disease from api python
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file_img.path));

    const apiUrl = this.configService.get('PYTHON_API');

    const response = await lastValueFrom(
      this.httpService.post(apiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      }),
    );

    // Find disease by name from response api python
    const disease = await this.prismaService.disease.findFirst({
      where: { name: response.data.predict },
    });

    // Find category product by name from response api python
    const categoryProduct = await this.prismaService.categoryProduct.findFirst({
      where: {
        name: response.data.predict,
      },
    });

    if (!disease || !categoryProduct) {
      throw new HttpException('Disease or category product not found', 404);
    }

    const historyScan = await this.prismaService.historyScan.create({
      data: {
        user: { connect: { id: user.id } },
        disease: { connect: { id: disease.id } },
        category_products: {
          connect: { id: categoryProduct.id },
        },
        face_img: file_img.filename,
      },
      include: {
        disease: true,
        category_products: true,
      },
    });

    // get all products from id category
    const products = await this.prismaService.product.findMany({
      where: { category_id: categoryProduct.id },
    });

    return {
      id: historyScan.id,
      userId: historyScan.user_id,
      disease: historyScan.disease.name,
      description_disease: historyScan.disease.description,
      solution_disease: historyScan.disease.solution,
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        nutrition: product.nutrition,
        product_img: product.product_img,
        link_product: product.link_product,
      })),
      face_img: historyScan.face_img,
      created_at: historyScan.created_at,
    };
  }

  // Logic to get all history
  async getAllHistories(user: User): Promise<HistoryScanResponse[]> {
    console.log(user);
    this.logger.info('HistoryScanService.getHistories');
    const histories = await this.prismaService.historyScan.findMany({
      where: { user_id: user.id },
      include: {
        disease: true,
        category_products: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!histories) {
      throw new HttpException('Histories was empty', 404);
    }

    // get all products from id category

    return histories.map((history) => ({
      id: history.id,
      userId: history.user_id,
      disease: history.disease.name,
      description_disease: history.disease.description,
      solution_disease: history.disease.solution,
      products: history.category_products.products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        nutrition: product.nutrition,
        product_img: product.product_img,
        link_product: product.link_product,
      })),
      face_img: history.face_img,
      created_at: history.created_at,
    }));
  }

  // Logic to get history by id
  async getHistoryScanById(historyId: number): Promise<HistoryScanResponse> {
    this.logger.info('HistoryScanService.getHistoryScanById');

    const history = await this.prismaService.historyScan.findUnique({
      where: { id: historyId },
      include: {
        disease: true,
        category_products: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!history) {
      throw new HttpException('History not found', 404);
    }

    return {
      id: history.id,
      userId: history.user_id,
      disease: history.disease.name,
      description_disease: history.disease.description,
      solution_disease: history.disease.solution,
      products: history.category_products.products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        nutrition: product.nutrition,
        product_img: product.product_img,
        link_product: product.link_product,
      })),
      face_img: history.face_img,
      created_at: history.created_at,
    };
  }

  // Logic to delete history by id
  async deleteHistoryScanById(historyId: number): Promise<boolean> {
    this.logger.info('HistoryScanService.deleteHistoryScanById');

    const history = await this.prismaService.historyScan.findUnique({
      where: { id: historyId },
    });

    if (!history) {
      throw new HttpException('History not found', 404);
    }

    if (
      history.face_img &&
      fs.existsSync(`./src/history_scan/image/${history.face_img}`)
    ) {
      fs.unlinkSync(`./src/history_scan/image/${history.face_img}`);
    }

    await this.prismaService.historyScan.delete({
      where: { id: historyId },
    });

    return true;
  }
}
