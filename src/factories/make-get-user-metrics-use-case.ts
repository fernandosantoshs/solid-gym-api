import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics';

export function makeGetUserMetrics() {
  const checkInsRepository = new PrismaCheckInsRepository();

  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
