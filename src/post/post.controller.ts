import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
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
  @Get('/:postId/likes')
  @HttpCode(200)
  async likePost(@Param('postId', ParseIntPipe) postId: number) {
    const response = await this.postService.likePost(postId);

    return {
      data: response,
    };
  }

  // API to get post by id
  @Get('/:postId')
  @HttpCode(200)
  async getPostById(
    @Param('postId', ParseIntPipe) postId: number,
    @Query('post_clicked') postClicked: boolean,
  ) {
    if (postClicked === undefined) {
      throw new HttpException(
        'Query parameter "post_clicked" is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.postService.getPostById(postId, postClicked);

    return {
      data: response,
    };
  }

  // API to update post

  // API to delete post
}
