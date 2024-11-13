import { Module } from '@nestjs/common';
import { CategoryProductService } from './categoryProduct.service';
import { CategoryProductController } from './categoryProduct.controller';

@Module({
  providers: [CategoryProductService],
  controllers: [CategoryProductController],
})
export class CategoryProductModule {}
