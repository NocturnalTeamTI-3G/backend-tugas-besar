import { Controller } from '@nestjs/common';
import { CategoryPostService } from './categoryPost.service';

@Controller('/api/category-posts')
export class CategoryPostController {
  constructor(private categoryPostService: CategoryPostService) {}
}
