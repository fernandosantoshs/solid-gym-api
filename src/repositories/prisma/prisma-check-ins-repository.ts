import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCheckInsRepository implements CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({ where: { id } });

    return checkIn;
  }

  findCheckInByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    throw new Error('Method not implemented.');
  }

  findManyCheckInsByUserId(userId: string, page: number): Promise<CheckIn[]> {
    throw new Error('Method not implemented.');
  }

  countCheckInsByUserId(userId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  save(checkIn: CheckIn): Promise<CheckIn> {
    throw new Error('Method not implemented.');
  }
}
