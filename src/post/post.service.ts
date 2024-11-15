import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PostRequest, PostResponse } from '../model/post.model';
import { ValidationService } from '../common/validation.service';
import { PostValidation } from './post.validation';
import { User } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // Logic to create new post
  async createPost(
    user: User,
    request: PostRequest,
    image: Express.Multer.File,
  ): Promise<PostResponse> {
    this.logger.info('PostService.createPost');
    console.log(request);

    // change data type category_id
    request.category_id = parseInt(request.category_id as any, 10);

    const post: PostRequest = this.validationService.validate(
      PostValidation.CREATE,
      request,
    );

    // add to database
    const newPost = await this.prismaService.post.create({
      data: {
        title: post.title,
        content: post.content,
        category_id: post.category_id,
        user_id: user.id,
        post_img: image.filename,
      },
    });

    return {
      id: newPost.id,
      title: newPost.title,
      content: newPost.content,
      category_id: newPost.category_id,
      user_id: newPost.user_id,
      post_img: newPost.post_img,
      views: newPost.views,
      likes: newPost.likes,
      created_at: newPost.created_at,
      updated_at: newPost.updated_at,
    };
  }
}
