import { Module } from '@nestjs/common';
import { HistoryScanService } from './historyScan.service';
import { HistoryScanController } from './historyScan.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [HistoryScanService],
  controllers: [HistoryScanController],
})
export class HistoryScanModule {}
