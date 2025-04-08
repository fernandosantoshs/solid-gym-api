import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';

interface FetchCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchCheckInsHistoryUseCase {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchCheckInsHistoryUseCaseRequest): Promise<FetchCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkinsRepository.findManyCheckInsByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
