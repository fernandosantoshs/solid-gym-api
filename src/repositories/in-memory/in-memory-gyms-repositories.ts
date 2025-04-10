import { Gym, Prisma } from '@prisma/client';
import { FetchNearbyGymsParams, GymsRepository } from '../gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';
import { calculateDistanceBetweenCoordinates } from '@/utils/get-distance-between-coodinates';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async searchManyNearby({ latitude, longitude }: FetchNearbyGymsParams) {
    const gyms = this.items.filter((gym) => {
      const distance = calculateDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        }
      );

      return distance <= 10; // Kilometers
    });

    return gyms;
  }

  async searchMany(query: string, page: number) {
    const gyms = this.items
      .filter((gym) => gym.title.toUpperCase().includes(query.toUpperCase()))
      .slice((page - 1) * 20, page * 20);

    return gyms;
  }
}
