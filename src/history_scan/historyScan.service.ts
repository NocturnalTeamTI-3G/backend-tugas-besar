import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { User } from '@prisma/client';
import {
  HistoryScanRequest,
  HistoryScanResponse,
} from '../model/historyScan.model';
import { HistoryScanValidation } from './historyScan.validation';
import * as fs from 'fs';

@Injectable()
export class HistoryScanService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // Logic to create a new history
  async createHistoryScan(
    user: User,
    request: HistoryScanRequest,
    file_img: Express.Multer.File,
  ): Promise<HistoryScanResponse> {
    this.logger.info('HistoryScanService.createHistoryScan');

    // Convert string values to numbers
    request.diseaseId = parseInt(request.diseaseId as any, 10);
    request.productId = parseInt(request.productId as any, 10);

    console.log(request);
    const historyScanRequest: HistoryScanRequest =
      this.validationService.validate(HistoryScanValidation.CREATE, request);

    const historyScan = await this.prismaService.historyScan.create({
      data: {
        user: { connect: { id: user.id } },
        disease: { connect: { id: historyScanRequest.diseaseId } },
        product: { connect: { id: historyScanRequest.productId } },
        face_img: file_img.filename,
      },
      include: {
        disease: true,
        product: true,
      },
    });

    return {
      id: historyScan.id,
      userId: historyScan.user_id,
      disease: historyScan.disease.name,
      description_disease: historyScan.disease.description,
      solution_disease: historyScan.disease.solution,
      product: historyScan.product.name,
      description_product: historyScan.product.description,
      face_img: historyScan.face_img,
      created_at: historyScan.created_at,
    };
  }

  // Logic to get all history
  async getAllHistories(user: User): Promise<HistoryScanResponse[]> {
    this.logger.info('HistoryScanService.getHistories');
    const histories = await this.prismaService.historyScan.findMany({
      where: { user_id: user.id },
      include: {
        disease: true,
        product: true,
      },
    });

    if (!histories) {
      throw new HttpException('Histories was empty', 404);
    }

    return histories.map((history) => ({
      id: history.id,
      userId: history.user_id,
      disease: history.disease.name,
      description_disease: history.disease.description,
      solution_disease: history.disease.solution,
      product: history.product.name,
      description_product: history.product.description,
      face_img: history.face_img,
      created_at: history.created_at,
    }));
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
