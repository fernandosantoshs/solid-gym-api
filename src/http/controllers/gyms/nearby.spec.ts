import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Search nearby gyms (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to fetch nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/gyms')
      .auth(token, { type: 'bearer' })
      .send({
        title: `Near Gym`,
        description: 'Always near you',
        phone: '9999999',
        latitude: -8.0493472,
        longitude: -34.8783069,
      });

    await request(app.server)
      .post('/gyms')
      .auth(token, { type: 'bearer' })
      .send({
        title: `Far Gym`,
        description: 'Far away from you',
        phone: '9999999',
        latitude: -8.5078622,
        longitude: -35.0036144,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .auth(token, { type: 'bearer' })
      .query({
        latitude: -8.0616538,
        longitude: -34.8718459,
      });

    const { gyms } = response.body;

    expect(response.statusCode).toEqual(200);
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ]);
  });
});
