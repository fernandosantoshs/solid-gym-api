import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticationUseCase } from '@/use-cases/authentication';

export function makeAuthenticationUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new AuthenticationUseCase(usersRepository);

  return useCase;
}
