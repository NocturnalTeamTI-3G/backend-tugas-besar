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
  ): Promise<HistoryScanResponse> {
    this.logger.info('HistoryScanService.createHistoryScan');
    const historyScanRequest: HistoryScanRequest =
      this.validationService.validate(HistoryScanValidation.CREATE, request);

    const historyScan = await this.prismaService.historyScan.create({
      data: {
        user: { connect: { id: user.id } },
        disease: { connect: { id: historyScanRequest.diseaseId } },
        product: { connect: { id: historyScanRequest.productId } },
        face_img: historyScanRequest.face_img,
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
    }));
  }
}
