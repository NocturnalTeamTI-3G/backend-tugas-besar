import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { DiseaseModule } from './disease/disease.module';

@Module({
  imports: [CommonModule, UserModule, RoleModule, ProductModule, DiseaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
