import { Gym, Prisma } from '@prisma/client';

export interface FetchNearbyGymsParams {
  latitude: number;
  longitude: number;
}
export interface GymsRepository {
  searchMany(query: string, page: number): Promise<Gym[]>;
  searchManyNearby(params: FetchNearbyGymsParams): Promise<Gym[]>;
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
