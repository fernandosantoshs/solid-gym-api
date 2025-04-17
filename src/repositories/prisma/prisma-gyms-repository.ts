import { Gym, Prisma } from '@prisma/client';
import { FetchNearbyGymsParams, GymsRepository } from '../gyms-repository';
import { prisma } from '@/lib/prisma';

export class PrismaGymsRepository implements GymsRepository {
  searchMany(query: string, page: number): Promise<Gym[]> {
    throw new Error('Method not implemented.');
  }

  searchManyNearby(params: FetchNearbyGymsParams): Promise<Gym[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  create(data: Prisma.GymCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.');
  }
}
