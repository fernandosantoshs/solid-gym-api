import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

describe('Validate check-in (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to validate check-in', async () => {
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

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    });

    const validateCheckInResponse = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .auth(token, { type: 'bearer' });

    const validatedCheckIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    });

    expect(validateCheckInResponse.statusCode).toEqual(204);

    expect(validatedCheckIn.validated_at).toEqual(expect.any(Date));
  });
});
