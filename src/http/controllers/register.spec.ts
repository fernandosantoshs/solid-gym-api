import { app } from '@/app';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

describe('Register (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Don Lotario',
      email: 'donlotario@example.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(201);
  });
});
