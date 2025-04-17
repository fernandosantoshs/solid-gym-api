import { Gym, Prisma } from '@prisma/client';
import { FetchNearbyGymsParams, GymsRepository } from '../gyms-repository';
import { prisma } from '@/lib/prisma';

export class PrismaGymsRepository implements GymsRepository {
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async searchManyNearby({
    latitude,
    longitude,
  }: FetchNearbyGymsParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`SELECT * from gym`;

    return gyms;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data });

    return gym;
  }
}
