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

  describe('POST /api/histories', () => {
    beforeEach(async () => {
      await testService.createHistoryScan();
      await testService.deleteHistoryScan();

      const loginMemberResponse = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'member@gmail.com',
          password: 'membermember',
        });

      authTokenMember = loginMemberResponse.body.data.token;
    });

    it('should be rejected if dont have token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/histories')
        .set('Authorization', `wrong`)
        .send({
          diseaseId: 1,
          productId: 1,
          face_img: 'test.jpg',
        });

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it('should be rejected if have token and invalid request', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/histories')
        .set('Authorization', `${authTokenMember}`)
        .send({
          diseaseId: NaN,
          productId: NaN,
          face_img: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('should be able to create history', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/histories')
        .set('Authorization', `${authTokenMember}`)
        .send({
          diseaseId: 1,
          productId: 1,
          face_img: 'test.jpg',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /api/histories', () => {
    beforeEach(async () => {
      await testService.deleteHistoryScan();
      await testService.createHistoryScan();

      const loginMemberResponse = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'member@gmail.com',
          password: 'membermember',
        });

      authTokenMember = loginMemberResponse.body.data.token;
    });

    it('should be rejected if dont have token', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/histories')
        .set('Authorization', `wrong`);

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it('should be able to create history', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/histories')
        .set('Authorization', `${authTokenMember}`);

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });
});
