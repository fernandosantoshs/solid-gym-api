import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositories';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: `Typescript Gym`,
      description: 'Get Big in Typescript ;)',
      phone: '9999999',
      latitude: -8.0493472,
      longitude: -34.8783069,
    });

    await gymsRepository.create({
      title: `Far away Gym`,
      description: 'This gym shouldnt appear in search',
      phone: '8888888',
      latitude: -8.5078622,
      longitude: -35.0036144,
    });

    const { gyms } = await sut.execute({
      userLatitude: -8.0616538,
      userLongitude: -34.8718459,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Typescript Gym' }),
    ]);
  });
});
