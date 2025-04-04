import { GymsRepository } from '@/repositories/gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymUseCase } from './create-gym';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositories';

let gymsRepository: GymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Typescript Gym',
      description: '',
      phone: '9999999',
      latitude: -8.0493472,
      longitude: -34.8783069,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
