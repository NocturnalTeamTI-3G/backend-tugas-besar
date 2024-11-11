import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  uploadFile(file: Express.Multer.File) {
    return { message: 'File uploaded successfully', filename: file.filename };
  }
}
