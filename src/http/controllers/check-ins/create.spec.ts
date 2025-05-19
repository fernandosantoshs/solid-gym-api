import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { prisma } from '@/lib/prisma';

describe('Create check-in (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: `Typescript Gym`,
        description: 'Always near you',
        phone: '9999999',
        latitude: -8.0493472,
        longitude: -34.8783069,
      },
    });

    const reponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-in`)
      .auth(token, { type: 'bearer' })
      .send({
        latitude: -8.0493471,
        longitude: -34.8783068,
      });

    expect(reponse.statusCode).toEqual(201);
  });
});
