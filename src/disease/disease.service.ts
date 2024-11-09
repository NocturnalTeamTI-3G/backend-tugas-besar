import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { DiseaseRequest, DiseaseResponse } from '../model/disease.model';
import { ValidationService } from '../common/validation.service';
import { DiseaseValidation } from './disease.validation';

@Injectable()
export class DiseaseService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // Logic create new disease
  async createDisease(request: DiseaseRequest): Promise<DiseaseResponse> {
    this.logger.info('DiseaseService.createDisease');

    const disease: DiseaseRequest = this.validationService.validate(
      DiseaseValidation.CREATE,
      request,
    );

    // Create disease
    const createdDisease = await this.prismaService.disease.create({
      data: {
        name: disease.name,
        description: disease.description,
        solution: disease.solution,
      },
    });

    return {
      id: createdDisease.id,
      name: createdDisease.name,
      description: createdDisease.description,
      solution: createdDisease.solution,
    };
  }

  // Logic to get all diseases
  async getAllDiseases(): Promise<DiseaseResponse[]> {
    this.logger.info('DiseaseService.getAllDiseases');

    const diseases = await this.prismaService.disease.findMany();

    if (!diseases || diseases.length === 0) {
      throw new HttpException('No diseases found', 404);
    }

    return diseases.map((disease) => {
      return {
        id: disease.id,
        name: disease.name,
        description: disease.description,
        solution: disease.solution,
      };
    });
  }

  // Logic to get disease by id
}
