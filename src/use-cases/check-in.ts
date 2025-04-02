import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CheckInUseCaseRequest {
  gymId: string;
  userId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    gymId,
    userId,
    userLongitude,
    userLatitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const userCheckedInOnTheSameDay =
      await this.checkInsRepository.findCheckInByUserIdOnDate(
        userId,
        new Date()
      );

    if (userCheckedInOnTheSameDay) {
      throw new Error();
    }

    // calc distance between user and gym

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
