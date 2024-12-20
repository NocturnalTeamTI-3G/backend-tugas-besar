import { Controller, Get, HttpCode } from '@nestjs/common';
import { FaqService } from './faq.service';
import { WebResponse } from '../model/web.model';
import { FaqResponse } from '../model/faq.model';

@Controller('/api/faqs')
export class FaqController {
  constructor(private faqService: FaqService) {}

  // API to get all faq
  @Get()
  @HttpCode(200)
  async getFaq(): Promise<WebResponse<FaqResponse[]>> {
    const faqs = await this.faqService.getFaq();

    return {
      data: faqs,
    };
  }
}
