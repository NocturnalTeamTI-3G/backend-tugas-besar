import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { HistoryScanService } from './historyScan.service';
import { Auth } from '../common/auth.decorator';
import {
  HistoryScanRequest,
  HistoryScanResponse,
} from '../model/historyScan.model';
import { User } from '@prisma/client';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/histories')
export class HistoryScanController {
  constructor(private historyScanService: HistoryScanService) {}

  // API to create a new history
  @Post()
  @HttpCode(200)
  async createHistoryScan(
    @Auth() user: User,
    @Body() request: HistoryScanRequest,
  ) {
    const historyScan = await this.historyScanService.createHistoryScan(
      user,
      request,
    );

    return {
      data: historyScan,
    };
  }

  // API to get all history
  @Get()
  @HttpCode(200)
  async getAllHistories(
    @Auth() user: User,
  ): Promise<WebResponse<HistoryScanResponse[]>> {
    const histories = await this.historyScanService.getAllHistories(user);

    return {
      data: histories,
    };
  }
}
