import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({ where: { id } });

    return checkIn;
  }

  async findCheckInByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date');
    const endOfDay = dayjs(date).endOf('date');

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay.toString(),
          lte: endOfDay.toString(),
        },
      },
    });

    return checkIn;
  }

  async findManyCheckInsByUserId(userId: string, page: number) {
    throw new Error('Method not implemented.');
  }

  async countCheckInsByUserId(userId: string) {
    throw new Error('Method not implemented.');
  }

  async save(data: CheckIn) {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return updatedCheckIn;
  }
}
