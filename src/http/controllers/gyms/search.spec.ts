import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Search gyms (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/gyms')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'Typescript gym',
        description: 'Get big in Typescript!',
        phone: '55819999999',
        latitude: -8.0493472,
        longitude: -34.8783069,
      });

    await request(app.server)
      .post('/gyms')
      .auth(token, { type: 'bearer' })
      .send({
        title: 'NodeJs gym',
        description: 'This one should not appear in search',
        phone: '558188888888',
        latitude: -8.0493423,
        longitude: -34.8783032,
      });

    const response = await request(app.server)
      .get('/gyms/search')
      .auth(token, { type: 'bearer' })
      .query({
        query: 'Typescript',
        page: 1,
      });

    const { gyms } = response.body;

    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Typescript gym',
      }),
    ]);
  });
});
