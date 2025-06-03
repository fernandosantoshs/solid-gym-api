import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Create Gym (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post('/gyms')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'Typescript gym',
        description: 'Get big in Typescript!',
        phone: '55819999999',
        latitude: -8.0493472,
        longitude: -34.8783069,
      });

    expect(response.statusCode).toEqual(201);
  });
});
