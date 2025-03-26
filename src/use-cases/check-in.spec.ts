import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { describe, it, expect, beforeEach } from 'vitest';
import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRespository;
let sut: CheckInUseCase;

describe('Check-in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
