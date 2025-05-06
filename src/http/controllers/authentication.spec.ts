import { app } from '@/app';
import request from 'supertest';
import { describe, beforeAll, afterAll, it, expect } from 'vitest';

describe('Authentication (E2E)', async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Don Lotario',
      email: 'donlotario@example.com',
      password: '123456',
    });

    const response = await request(app.server).post('/sessions').send({
      email: 'donlotario@example.com',
      password: '123456',
    });

    expect(response.body).toEqual({ token: expect.any(String) });
  });
});
