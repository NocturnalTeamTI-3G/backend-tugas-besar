import { Module } from '@nestjs/common';
import { HistoryScanService } from './historyScan.service';
import { HistoryScanController } from './historyScan.controller';

@Module({
  providers: [HistoryScanService],
  controllers: [HistoryScanController],
})
export class HistoryScanModule {}
