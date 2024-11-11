import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HistoryScanService } from './historyScan.service';
import { Auth } from '../common/auth.decorator';
import {
  HistoryScanRequest,
  HistoryScanResponse,
} from '../model/historyScan.model';
import { User } from '@prisma/client';
import { WebResponse } from 'src/model/web.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('/api/histories')
export class HistoryScanController {
  constructor(private historyScanService: HistoryScanService) {}

  // API to create a new history
  @Post()
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('face_img', {
      storage: diskStorage({
        destination: './src/history_scan/image',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const filename = file.fieldname + '-' + uniqueSuffix + fileExtName;
          cb(null, filename);
        },
      }),
    }),
  )
  async createHistoryScan(
    @Auth() user: User,
    @UploadedFile() face_img: Express.Multer.File,
    @Body() request: HistoryScanRequest,
  ) {
    const historyScan = await this.historyScanService.createHistoryScan(
      user,
      request,
      face_img,
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

  // API to delete history by id
  @Delete('/:historyId')
  @HttpCode(200)
  async deleteHistoryScan(
    @Auth() user: User,
    @Param('historyId', ParseIntPipe) historyId: number,
  ): Promise<WebResponse<boolean>> {
    const deletedHistory = await this.historyScanService.deleteHistoryScanById(
      user,
      historyId,
    );

    return {
      data: deletedHistory,
    };
  }
}
