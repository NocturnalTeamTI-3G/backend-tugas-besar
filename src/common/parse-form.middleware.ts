import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ParseFormMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log();
    if (req.headers['content-type'].includes('multipart/form-data')) {
      if (req.body) {
        for (const key in req.body) {
          if (Buffer.isBuffer(req.body[key])) {
            req.body[key] = req.body[key].toString();
          }
        }
      }
    }
    next();
  }
}
