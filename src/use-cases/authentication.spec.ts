import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { describe, it, expect } from 'vitest';
import { AuthenticationUseCase } from './authentication';
import { hash } from 'bcrypt';
// it should be able to authenticate [x]
// it should not be able to authenticate with wrong email []
// it should not be able to authenticate with wrong password []

describe('Authentication use cases', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticationUseCase = new AuthenticationUseCase(usersRepository);

    await usersRepository.create({
      name: 'Don Lotario',
      email: 'donlotario@email.com',
      password_hash: await hash('mypassword', 6),
    });

    const { user } = await authenticationUseCase.authenticate({
      email: 'donlotario@email.com',
      password: 'mypassword',
    });

    expect(user).toHaveProperty('id');
  });
});
