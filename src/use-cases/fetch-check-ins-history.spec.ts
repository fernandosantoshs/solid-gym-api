import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { describe, beforeEach, it, expect } from 'vitest';
import { FetchCheckInsHistoryUseCase } from './fetch-check-ins-history';

let inMemoryCheckInsRepository: InMemoryCheckInsRespository;
let sut: FetchCheckInsHistoryUseCase;

describe('Fetch user check-ins history use case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRespository();
    sut = new FetchCheckInsHistoryUseCase(inMemoryCheckInsRepository);
  });

  it('should be able to fetch user check-ins history', async () => {
    await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    });

    const { checkIns } = await sut.execute({ userId: 'user-01' });

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ]);
  });
});
