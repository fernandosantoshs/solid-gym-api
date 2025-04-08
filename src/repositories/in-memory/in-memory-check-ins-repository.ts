import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

export class InMemoryCheckInsRespository implements CheckInsRepository {
  constructor(private items: CheckIn[] = []) {}

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findCheckInByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date');
    const endOfDay = dayjs(date).endOf('date');

    const checkIn = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const hasUserCheckedInToday =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);

      return checkIn.user_id === userId && hasUserCheckedInToday;
    });

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async findManyCheckInsByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter((checkin) => checkin.user_id === userId)
      .slice((page - 1) * 20, page * 20);

    return checkIns;
  }
}
