import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ValidateCheckInUseCase } from './validate-check-in';

let checkInsRepository: InMemoryCheckInsRespository;
let sut: ValidateCheckInUseCase;

describe('Validate Check in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
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
});
