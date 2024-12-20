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
  async getDiseaseById(diseaseId: number): Promise<DiseaseResponse> {
    this.logger.info('DiseaseService.getDiseaseById');

    const disease = await this.prismaService.disease.findFirst({
      where: {
        id: diseaseId,
      },
    });

    if (!disease) {
      throw new HttpException('Disease not found', 404);
    }

    return {
      id: disease.id,
      name: disease.name,
      description: disease.description,
      solution: disease.solution,
    };
  }

  // Logic to update disease by id
  async updateDiseaseById(
    diseaseId: number,
    request: DiseaseRequest,
  ): Promise<DiseaseResponse> {
    this.logger.info('DiseaseService.updateDiseaseById');

    const disease: DiseaseRequest = this.validationService.validate(
      DiseaseValidation.UPDATE,
      request,
    );

    const checkDisease = await this.prismaService.disease.findFirst({
      where: {
        id: diseaseId,
      },
    });

    if (!checkDisease) {
      throw new HttpException('Disease not found', 404);
    }

    // Update disease
    const updatedDisease = await this.prismaService.disease.update({
      where: {
        id: diseaseId,
      },
      data: disease,
    });

    return {
      id: updatedDisease.id,
      name: updatedDisease.name,
      description: updatedDisease.description,
      solution: updatedDisease.solution,
    };
  }

  // Logic to delete disease by id
  async deleteDiseaseById(diseaseId: number): Promise<boolean> {
    this.logger.info('DiseaseService.deleteDiseaseById');

    const checkDisease = await this.prismaService.disease.findFirst({
      where: {
        id: diseaseId,
      },
    });

    if (!checkDisease) {
      throw new HttpException('Disease not found', 404);
    }

    // Delete disease
    await this.prismaService.disease.delete({
      where: {
        id: diseaseId,
      },
    });

    return true;
  }
}
