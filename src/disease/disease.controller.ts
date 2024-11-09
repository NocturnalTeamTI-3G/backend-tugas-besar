import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../common/roles.guard';
import { DiseaseService } from './disease.service';
import { Roles } from '../common/roles.decorator';
import { DiseaseRequest, DiseaseResponse } from '../model/disease.model';
import { WebResponse } from '../model/web.model';

@Controller('/api/diseases')
@UseGuards(RolesGuard)
export class DiseaseController {
  constructor(private diseaseService: DiseaseService) {}

  // API to create disease
  @Post('')
  @Roles('admin')
  @HttpCode(200)
  async createDisease(
    @Body() request: DiseaseRequest,
  ): Promise<WebResponse<DiseaseResponse>> {
    const disease = await this.diseaseService.createDisease(request);

    return {
      data: disease,
    };
  }

  // API to get all diseases
  @Get()
  @HttpCode(200)
  async getAllDiseases(): Promise<WebResponse<DiseaseResponse[]>> {
    const diseases = await this.diseaseService.getAllDiseases();

    return {
      data: diseases,
    };
  }

  // API to get disease by id
  @Get('/:diseaseId')
  @HttpCode(200)
  async getDiseaseById(
    @Param('diseaseId', ParseIntPipe) diseaseId: number,
  ): Promise<WebResponse<DiseaseResponse>> {
    const disease = await this.diseaseService.getDiseaseById(diseaseId);

    return {
      data: disease,
    };
  }

  // API to update disease by id
  @Patch('/:diseaseId')
  @Roles('admin')
  @HttpCode(200)
  async updateDisease(
    @Param('diseaseId', ParseIntPipe) diseaseId: number,
    @Body() request: DiseaseRequest,
  ): Promise<WebResponse<DiseaseResponse>> {
    const disease = await this.diseaseService.updateDiseaseById(
      diseaseId,
      request,
    );

    return {
      data: disease,
    };
  }
}
