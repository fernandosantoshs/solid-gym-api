import { Prisma } from '@prisma/client';

export class InMemoryUserRepository {
  private users: any[] = [];

  async create(data: Prisma.UserCreateInput) {
    this.users.push(data);
  }
}
