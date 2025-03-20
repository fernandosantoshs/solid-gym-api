import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticationUseCase } from '@/use-cases/authentication';

export function makeAuthenticationUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticationUseCase = new AuthenticationUseCase(usersRepository);

  return authenticationUseCase;
}
