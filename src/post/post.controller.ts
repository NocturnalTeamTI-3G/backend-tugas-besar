import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from '../common/roles.guard';
import { PostService } from './post.service';
import { Roles } from '../common/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';
import { PostRequest, PostResponse } from '../model/post.model';
import { WebResponse } from '../model/web.model';

@Controller('/api/posts')
@UseGuards(RolesGuard)
export class PostController {
  constructor(private postService: PostService) {}

  // API to create a new post
  @Post()
  @HttpCode(200)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('post_img', {
      storage: diskStorage({
        destination: './src/post/image',
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${fileExtName}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createPost(
    @Auth() user: User,
    @Body() request: PostRequest,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<WebResponse<PostResponse>> {
    const response = await this.postService.createPost(user, request, image);

    return {
      data: response,
    };
  }

  // API to get all posts
  @Get()
  @HttpCode(200)
  async getAllPosts(@Query('order') order: 'asc' | 'desc') {
    const response = await this.postService.getAllPosts(order);

    return {
      data: response,
    };
  }

  // API to likes post

  // API to get post by id

  // API to update post

  // API to delete post
}
