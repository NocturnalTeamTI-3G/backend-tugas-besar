import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { UserController } from './controller/user/user.controller';
import { User } from './provider/user/user';
import { PostModule } from './module/post/post.module';
import { PostController } from './controller/post/post.controller';
import { Post } from './provider/post/post';
import { RoleModule } from './module/role/role.module';
import { RoleController } from './controller/role/role.controller';
import { Role } from './provider/role/role';

@Module({
  imports: [UserModule, PostModule, RoleModule],
  controllers: [AppController, UserController, PostController, RoleController],
  providers: [AppService, User, Post, Role],
})
export class AppModule {}
