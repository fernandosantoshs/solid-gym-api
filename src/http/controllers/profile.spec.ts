import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { string } from 'zod';

describe('Get user profile (E2E)', async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'Don Lotario',
      email: 'donlotario@example.com',
      password: '123456',
    });

    const { token } = await request(app.server)
      .post('/sessions')
      .send({
        email: 'donlotario@example.com',
        password: '123456',
      })
      .then((response) => {
        return response.body;
      });

    const response = await request(app.server)
      .get('/me')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: 'donlotario@example.com',
      })
    );
  });
});
