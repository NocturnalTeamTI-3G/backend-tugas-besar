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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/diseases', () => {
    beforeEach(async () => {
      await testService.createDisease();
      await testService.deleteDisease();

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
        .post('/api/diseases')
        .set('Authorization', `${authTokenMember}`)
        .send({
          name: 'test',
          description: 'test',
          solution: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it('should be rejected if admin and invalid request', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/diseases')
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
        .post('/api/diseases')
        .set('Authorization', `${authToken}`)
        .send({
          name: 'test',
          description: 'test',
          solution: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.description).toBe('test');
      expect(response.body.data.solution).toBe('test');
    });
  });

  describe('GET /api/diseases', () => {
    beforeEach(async () => {
      await testService.deleteDisease();
      await testService.createDisease();
    });

    it('should be able to get all diseases', async () => {
      const response = await request(app.getHttpServer()).get('/api/diseases');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });
});
