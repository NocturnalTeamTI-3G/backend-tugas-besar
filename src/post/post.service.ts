import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PostRequest, PostResponse } from '../model/post.model';
import { ValidationService } from '../common/validation.service';
import { PostValidation } from './post.validation';
import { User } from '@prisma/client';
import * as fs from 'fs';

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

    if (image) {
      post.post_img = image.filename;
    }

    // add to database
    const newPost = await this.prismaService.post.create({
      data: {
        title: post.title,
        content: post.content,
        category_id: post.category_id,
        user_id: user.id,
        post_img: post.post_img,
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

  // Logic to get all posts
  async getAllPosts(order: 'asc' | 'desc'): Promise<PostResponse[]> {
    this.logger.info('PostService.getAllPosts');

    const posts = await this.prismaService.post.findMany({
      orderBy: {
        created_at: order,
      },
    });

    return posts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        category_id: post.category_id,
        user_id: post.user_id,
        post_img: post.post_img,
        views: post.views,
        likes: post.likes,
        created_at: post.created_at,
        updated_at: post.updated_at,
      };
    });
  }

  // Logic to like post
  async likePost(postId: number): Promise<PostResponse> {
    this.logger.info('PostService.likePost');

    const post = await this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      category_id: post.category_id,
      user_id: post.user_id,
      post_img: post.post_img,
      views: post.views,
      likes: post.likes,
      created_at: post.created_at,
      updated_at: post.updated_at,
    };
  }

  // Logic to get post by id
  async getPostById(
    postId: number,
    post_clicked: boolean,
  ): Promise<PostResponse> {
    this.logger.info('PostService.getPostById');

    const post = await this.prismaService.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    if (post_clicked) {
      await this.prismaService.post.update({
        where: {
          id: postId,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      category_id: post.category_id,
      user_id: post.user_id,
      post_img: post.post_img,
      views: post.views,
      likes: post.likes,
      created_at: post.created_at,
      updated_at: post.updated_at,
    };
  }

  // Logic to update post
  async updatePost(
    postId: number,
    request: PostRequest,
    image: Express.Multer.File,
  ): Promise<PostResponse> {
    this.logger.info('PostService.updatePost');

    // change data type category_id
    request.category_id = parseInt(request.category_id as any, 10);

    const post: PostRequest = this.validationService.validate(
      PostValidation.UPDATE,
      request,
    );

    const checkPost = await this.prismaService.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!checkPost) {
      throw new HttpException('Post not found', 404);
    }

    if (image) {
      if (fs.existsSync(`./src/post/image/${checkPost.post_img}`)) {
        const filePath = `./src/post/image/${checkPost.post_img}`;
        fs.unlinkSync(filePath);
      }

      post.post_img = image.filename;
    }

    // Update post
    const updatedPost = await this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: {
        title: post.title,
        content: post.content,
        category_id: post.category_id,
        post_img: post.post_img,
      },
    });

    return {
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      category_id: updatedPost.category_id,
      user_id: updatedPost.user_id,
      post_img: updatedPost.post_img,
      views: updatedPost.views,
      likes: updatedPost.likes,
      created_at: updatedPost.created_at,
      updated_at: updatedPost.updated_at,
    };
  }
}
