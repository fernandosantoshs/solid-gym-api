import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, it } from 'vitest';

describe('Create Gym (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app);

    // TODO : Finish this test
  });
});
