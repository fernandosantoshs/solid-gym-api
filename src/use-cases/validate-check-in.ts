import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import dayjs from 'dayjs';
import { ExpiredCheckInValidationError } from './errors/expired-check-in-validation-error';

interface ValidateCheckInUseCaseRequest {
  id: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    id,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(id);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const diffBetweenCheckInAndValidation = dayjs(new Date()).diff(
      dayjs(checkIn.created_at),
      'minutes'
    );

    const maxTimeToValidateCheckInInMinutes = 20;

    if (diffBetweenCheckInAndValidation > maxTimeToValidateCheckInInMinutes) {
      throw new ExpiredCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
