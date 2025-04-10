import { GymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface FetchNearbyGymsRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsResponse {
  gyms: Gym[];
}

export class FetchNearbyGyms {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.searchManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
