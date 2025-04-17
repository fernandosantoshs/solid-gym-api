import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { FetchCheckInsHistoryUseCase } from '@/use-cases/fetch-check-ins-history';

export function makeFetchCheckInsHistoryUseCase() {
  const checkinsRepository = new PrismaCheckInsRepository();

  const useCase = new FetchCheckInsHistoryUseCase(checkinsRepository);

  return useCase;
}
