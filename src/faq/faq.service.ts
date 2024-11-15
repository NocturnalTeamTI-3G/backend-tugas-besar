import { Inject, Injectable } from '@nestjs/common';
import { FaqResponse } from '../model/faq.model';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class FaqService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  async getFaq(): Promise<FaqResponse[]> {
    this.logger.info('FaqService.getFaq: Getting faq data');

    const filePath = path.join(__dirname, '..', '..', 'src', 'faq', 'faq.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const faqs = JSON.parse(data);

    return faqs.map((faq: FaqResponse) => ({
      question: faq.question,
      answer: faq.answer,
    }));
  }
}
