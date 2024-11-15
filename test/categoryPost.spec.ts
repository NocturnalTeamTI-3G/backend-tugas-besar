import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;
  let authToken: string;
  let authTokenMember: string;
  let category_id: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/category-posts', () => {
    beforeEach(async () => {
      await testService.deleteCategoryPost();
      await testService.createCategoryPost();

      // Perform login and get the auth token
      const loginAdminResponse = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'test@gmail.com',
          password: 'testtest',
        });

      const loginMemberResponse = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'member@gmail.com',
          password: 'membermember',
        });

      authToken = loginAdminResponse.body.data.token;
      authTokenMember = loginMemberResponse.body.data.token;
    });

    it('should be rejected if not admin', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/category-posts')
        .set('Authorization', `${authTokenMember}`)
        .send({
          name: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it('should be rejected if admin and invalid request', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/category-posts')
        .set('Authorization', `${authToken}`)
        .send({
          name: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('should be able to create category post', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/category-posts')
        .set('Authorization', `${authToken}`)
        .send({
          name: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /api/category-posts', () => {
    beforeEach(async () => {
      await testService.deleteCategoryPost();
      await testService.createCategoryPost();
    });

    it('should be able to get all category post', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/category-posts',
      );

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /api/category-posts/:categoryPostId', () => {
    beforeEach(async () => {
      await testService.deleteCategoryPost();
      await testService.createCategoryPost();

      category_id = await testService.getCategoryPostId();
    });

    it('should be rejected if category not found', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/category-posts/' + 999999,
      );

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body).toBeDefined();
    });

    it('should be able to get category post by id', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/category-posts/' + category_id,
      );

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('PATCH /api/category-posts/:categoryPostId', () => {
    beforeEach(async () => {
      await testService.deleteCategoryPost();
      await testService.createCategoryPost();

      category_id = await testService.getCategoryPostId();

      // Perform login and get the auth token
      const loginAdminResponse = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'test@gmail.com',
          password: 'testtest',
        });

      const loginMemberResponse = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'member@gmail.com',
          password: 'membermember',
        });

      authToken = loginAdminResponse.body.data.token;
      authTokenMember = loginMemberResponse.body.data.token;
    });

    it('should be rejected if not admin', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/category-posts/' + category_id)
        .set('Authorization', `${authTokenMember}`)
        .send({
          name: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it('should be rejected if admin and invalid category id', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/category-posts/9999999')
        .set('Authorization', `${authToken}`)
        .send({
          name: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body).toBeDefined();
    });

    it('should be rejected if admin and invalid request', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/category-posts/' + category_id)
        .set('Authorization', `${authToken}`)
        .send({
          name: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('should be able to update category product', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/category-posts/' + category_id)
        .set('Authorization', `${authToken}`)
        .send({
          name: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });
});
