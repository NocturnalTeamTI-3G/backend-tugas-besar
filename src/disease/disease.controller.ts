import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
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
}
