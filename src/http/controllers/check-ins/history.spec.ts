import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Fetch user check-ins history (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to fetch user check-in history', async () => {
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
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    });

    const { checkIns } = await request(app.server)
      .get('/check-ins/history')
      .auth(token, { type: 'bearer' })
      .query({
        page: 1,
      })
      .then((request) => {
        return request.body;
      });

    expect(checkIns).toHaveLength(2);

    expect(checkIns).toEqual([
      expect.objectContaining({
        user_id: expect.any(String),
      }),
      expect.objectContaining({
        user_id: expect.any(String),
      }),
    ]);
  });
});
