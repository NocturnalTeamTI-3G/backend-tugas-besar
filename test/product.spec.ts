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
  let product: any;
  let product_id: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/products', () => {
    beforeEach(async () => {
      await testService.deleteProduct();
      await testService.createProduct();

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
        .post('/api/products')
        .set('Authorization', `${authTokenMember}`)
        .send({
          name: 'test',
          description: 'test',
          category_id: 1,
          nutrition: 'test',
          product_img: 'test.jpg',
        });

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it('should be rejected if admin and invalid request', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `${authToken}`)
        .send({
          name: '',
          description: '',
          product_img: '',
          category_id: NaN,
          nutrition: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('should be able to create product', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `${authToken}`)
        .send({
          name: 'test',
          description: 'test',
          product_img: 'test.jpg',
          category_id: 1,
          nutrition: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /api/products', () => {
    beforeEach(async () => {
      await testService.deleteProduct();
      await testService.createProduct();
    });

    it('should be able to get all product', async () => {
      const response = await request(app.getHttpServer()).get('/api/products');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /api/products/:productId', () => {
    beforeEach(async () => {
      await testService.deleteProduct();
      await testService.createProduct();
    });

    it('should be rejected if product id not found', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/products/800',
      );

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body).toBeDefined();
    });

    it('should be able to get product by id', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/products/1',
      );

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('PATCH /api/products', () => {
    beforeEach(async () => {
      await testService.deleteProduct();
      await testService.createProduct();

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
        .patch(`/api/products/1`)
        .set('Authorization', `${authTokenMember}`)
        .send({
          name: 'test',
          description: 'test',
          product_img: 'test.jpg',
          category_id: 1,
          nutrition: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it('should be rejected if admin and invalid request', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/products/1`)
        .set('Authorization', `${authToken}`)
        .send({
          name: '',
          description: '',
          product_img: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('should be able to create product', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/products/1`)
        .set('Authorization', `${authToken}`)
        .send({
          name: 'test product',
          description: 'test product123',
          product_img: 'test.jpg',
          category_id: 1,
          nutrition: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('DELETE /api/products', () => {
    beforeEach(async () => {
      await testService.deleteProduct();
      await testService.createProduct();

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

      product = await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `${authToken}`)
        .send({
          name: 'test',
          description: 'test',
          product_img: 'test.jpg',
          category_id: 1,
          nutrition: 'test',
        });

      product_id = product.body.data.id;
    });

    it('should be rejected if not admin', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/products/${product_id}`)
        .set('Authorization', `${authTokenMember}`);

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it('should be able to delete product', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/products/${product_id}`)
        .set('Authorization', `${authToken}`);

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.message).toBeTruthy();
    });
  });
});
