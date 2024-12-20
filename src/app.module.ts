import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { DiseaseModule } from './disease/disease.module';
import { HistoryScanModule } from './history_scan/historyScan.module';
import { UploadModule } from './upload/upload.module';
import { CategoryProductModule } from './category_product/categoryProduct.module';
import { FaqModule } from './faq/faq.module';
import { CategoryPostModule } from './category_post/categoryPost.module';
import { PostModule } from './post/post.module';
import { ForgotPasswordModule } from './forgot_password/forgotPassword.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    RoleModule,
    ProductModule,
    DiseaseModule,
    HistoryScanModule,
    UploadModule,
    CategoryProductModule,
    CategoryPostModule,
    PostModule,
    FaqModule,
    ForgotPasswordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
