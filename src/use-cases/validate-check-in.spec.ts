import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ValidateCheckInUseCase } from './validate-check-in';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let checkInsRepository: InMemoryCheckInsRespository;
let sut: ValidateCheckInUseCase;

describe('Validate Check in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate check-in', async () => {
    const checkIn = await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    await sut.execute({ id: checkIn.id });

    expect(checkIn).toEqual(
      expect.objectContaining({
        user_id: 'user-01',
        validated_at: expect.any(Date),
      })
    );
  });

  it('should not be able to validate inexistent check-in', async () => {
    await expect(async () => {
      return sut.execute({ id: 'invalid-id' });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate check-in after max valid interval (20min)', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));

    const checkIn = await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
      created_at: new Date(),
    });

    vi.setSystemTime(new Date(2025, 0, 1, 8, 22, 0));

    await expect(async () => {
      return await sut.execute({ id: checkIn.id });
    }).rejects.toBeInstanceOf(Error);
  });
});
