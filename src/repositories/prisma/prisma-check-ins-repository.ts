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
          gte: startOfDay.toDate(),
          lte: endOfDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  async findManyCheckInsByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return checkIns;
  }

  async countCheckInsByUserId(userId: string) {
    const checkInsCount = await prisma.checkIn.count({
      where: { user_id: userId },
    });

    return checkInsCount;
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }
}
