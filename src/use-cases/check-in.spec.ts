import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositories';

let checkInsRepository: InMemoryCheckInsRespository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRespository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      title: 'NodeJs Gym',
      description: '',
      phone: '9999999',
      latitude: -8.0493472,
      longitude: -34.8783069,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -8.0493472,
      userLongitude: -34.8783069,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -8.0493472,
      userLongitude: -34.8783069,
    });

    await expect(async () => {
      return await sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -8.0493472,
        userLongitude: -34.8783069,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0)); // Jan 1, 2025

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -8.0493472,
      userLongitude: -34.8783069,
    });

    vi.setSystemTime(new Date(2025, 0, 2, 8, 0, 0)); // Jan 2, 2025

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -8.0493472,
      userLongitude: -34.8783069,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in when distant from the gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'Too far to check in',
      description: '',
      phone: '9999999',
      latitude: -8.0493472,
      longitude: -34.8783069,
    });

    await expect(() => {
      return sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -8.0505422,
        userLongitude: -34.8835217,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
