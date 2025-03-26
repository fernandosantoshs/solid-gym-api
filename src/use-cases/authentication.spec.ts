import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { describe, it, expect } from 'vitest';
import { AuthenticationUseCase } from './authentication';
import { hash } from 'bcrypt';
import { invalidCredentialsError } from './errors/invalid-credentials-error';
import { beforeEach } from 'vitest';
import { UsersRepository } from '@/repositories/users-repository';

let usersRepository: UsersRepository;
let sut: AuthenticationUseCase;

describe('Authentication use cases', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticationUseCase(usersRepository);
    // System Under Test: Authentication use case
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Don Lotario',
      email: 'donlotario@email.com',
      password_hash: await hash('mypassword', 6),
    });

    const { user } = await sut.authenticate({
      email: 'donlotario@email.com',
      password: 'mypassword',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'Don Lotario',
      email: 'donlotario@email.com',
      password_hash: await hash('mypassword', 6),
    });

    await expect(async () => {
      sut.authenticate({
        email: 'wrongEmail@email.com',
        password: 'mypassword',
      });
    }).rejects.toBeInstanceOf(invalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'donlotario@email.com';

    await usersRepository.create({
      name: 'Don Lotario',
      email,
      password_hash: await hash('mypassword', 6),
    });

    await expect(async () => {
      sut.authenticate({
        email,
        password: 'wrongPassword',
      });
    }).rejects.toBeInstanceOf(invalidCredentialsError);
  });
});
