import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Refresh Token (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get a refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'Don Lotario',
      email: 'donlotario@example.com',
      password: '123456',
    });

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'donlotario@example.com',
      password: '123456',
    });

    const cookie = authResponse.get('Set-Cookie') || [];

    const refreshResponse = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookie);

    expect(authResponse.status).toEqual(200);
    expect(authResponse.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );

    expect(refreshResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});
