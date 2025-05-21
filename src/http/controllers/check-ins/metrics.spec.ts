import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('User metrics test (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user metrics', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: `Typescript Gym`,
        description: 'Always near you',
        phone: '9999999',
        latitude: -8.0493472,
        longitude: -34.8783069,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,
        },
        {
          user_id: user.id,
          gym_id: gym.id,
        },
        {
          user_id: user.id,
          gym_id: gym.id,
        },
      ],
    });

    const metricsResponse = await request(app.server)
      .get('/check-ins/metrics')
      .auth(token, { type: 'bearer' });

    const { checkInsCount } = metricsResponse.body;

    expect(metricsResponse.statusCode).toEqual(200);

    expect(checkInsCount).toEqual(3);
  });
});
