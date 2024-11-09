import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { HistoryScanService } from './historyScan.service';
import { Auth } from '../common/auth.decorator';
import { HistoryScanRequest } from '../model/historyScan.model';
import { User } from '@prisma/client';

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
}
