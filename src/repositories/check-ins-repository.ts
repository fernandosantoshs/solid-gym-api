import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;

  findCheckInByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null>;

  findManyCheckInsByUserId(userId: string, page: number): Promise<CheckIn[]>;

  countCheckInsByUserId(userId: string): Promise<number>;
}
