import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Res,
} from '@nestjs/common';
import { existsSync } from 'fs';
import { resolve } from 'path';

@Controller('/api/image')
export class UploadController {
  @Get('/:folder/:filename')
  @HttpCode(200)
  async getImage(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: any,
  ) {
    const filePath = resolve(`src/${folder}/image/${filename}`);

    if (!existsSync(filePath)) {
      throw new HttpException('File not found', 404);
    }

    return res.sendFile(filePath);
  }
}
