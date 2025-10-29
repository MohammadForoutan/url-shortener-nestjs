import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import type { App } from 'supertest/types';

import { Test } from '@nestjs/testing';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/app (GET)', () => {
    return request(app.getHttpServer())
      .get('/app')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/v1/app/health (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/app/health')
      .expect(200);
    expect(response.body.dateTime).toBeDefined();
  });
});
