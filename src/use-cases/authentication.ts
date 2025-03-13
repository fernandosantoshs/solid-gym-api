import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { invalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticationUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticationUseCaseResponse {
  user: User;
}

export class AuthenticationUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async authenticate({
    email,
    password,
  }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new invalidCredentialsError();
    }

    const isPasswordMatching = await compare(password, user.password_hash);

    if (!isPasswordMatching) {
      throw new invalidCredentialsError();
    }

    return { user };
  }
}
