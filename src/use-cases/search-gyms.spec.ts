import { GymsRepository } from '@/repositories/gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SearchGymsUseCase } from './search-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositories';

let gymsRepository: GymsRepository;
let sut: SearchGymsUseCase;

describe('Search gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Typescript Gym',
      description: '',
      phone: '9999999',
      latitude: -8.0493472,
      longitude: -34.8783069,
    });

    await gymsRepository.create({
      title: 'Fitness Gym',
      description: '',
      phone: '9999999',
      latitude: -8.0495462,
      longitude: -34.8779069,
    });

    const search = await sut.execute({ query: 'Typescript', page: 1 });

    expect(search.gyms).toHaveLength(1);
    expect(search.gyms).toEqual([
      expect.objectContaining({ title: 'Typescript Gym' }),
    ]);
  });
});
