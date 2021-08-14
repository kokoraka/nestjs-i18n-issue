import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/core/app.module';
import { HttpExceptionFilter } from '../src/core/http-exception.filter';
import { TransformInterceptor } from '../src/core/transform.interceptor';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init()
  });

  describe('root - homepage resource', () => {
    it('should return valid code and message', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect({ code: '200', message: 'ok' });
    });
  });

  describe('not found resource', () => {
    it('should return valid code and message', () => {
      return request(app.getHttpServer()).get('/not-found')
        .expect(404)
        .expect({
          code: '404',
          message: 'Cannot GET /not-found',
        });
    });
  });

});
