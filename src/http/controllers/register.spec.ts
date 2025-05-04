import { app } from '@/app';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Register E2E tests', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register', async () => {});
});
