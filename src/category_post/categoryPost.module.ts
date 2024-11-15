import { Module } from '@nestjs/common';
import { CategoryPostService } from './categoryPost.service';
import { CategoryPostController } from './categoryPost.controller';

@Module({
  providers: [CategoryPostService],
  controllers: [CategoryPostController],
})
export class CategoryPostModule {}
