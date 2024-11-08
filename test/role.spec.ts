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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/roles', () => {
    beforeEach(async () => {
      await testService.deleteRole();
    });

    it('should be rejected if request invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/roles')
        .send({
          name: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('should be able to create', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/roles')
        .send({
          name: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.created_at).toBeDefined();
    });
  });

  describe('GET /api/roles', () => {
    it('should be able to get all roles', async () => {
      const response = await request(app.getHttpServer()).get('/api/roles');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /api/roles/:roleId', () => {
    it('should be rejected if role not found', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/roles/99999',
      );

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('should be able to get role by id', async () => {
      const response = await request(app.getHttpServer()).get('/api/roles/1');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('admin');
    });
  });

  describe('PATCH /api/roles/:roleId', () => {
    beforeEach(async () => {
      await testService.deleteRole();
      await testService.createRole();
    });

    it('should be rejected if role not found', async () => {
      const response = await request(app.getHttpServer()).patch(
        '/api/roles/9999',
      );

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('should be rejected if request invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/roles/1')
        .send({
          name: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });

    it('should be able to update role', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/roles/1')
        .send({
          name: 'admin',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('admin');
    });
  });
});
