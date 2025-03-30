import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRespository;
let sut: CheckInUseCase;

describe('Check-in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    await expect(async () => {
      return await sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0)); // Jan 1, 2025

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    vi.setSystemTime(new Date(2025, 0, 2, 8, 0, 0)); // Jan 2, 2025

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
