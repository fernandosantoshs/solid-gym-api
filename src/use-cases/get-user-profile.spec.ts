import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { describe, expect, it } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile';
import { hash } from 'bcrypt';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

describe('Get user profile tests', () => {
  it('should be able to get user profile', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new GetUserProfileUseCase(usersRepository);

    const createdUser = await usersRepository.create({
      name: 'Don Lotario',
      email: 'donlotario@email.com',
      password_hash: await hash('mypassword', 6),
    });

    const { user } = await sut.execute({ userId: createdUser.id });

    expect(user.email).toEqual('donlotario@email.com');
  });

  it('should not be able to get user profile with wrong id', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new GetUserProfileUseCase(usersRepository);

    await expect(async () => {
      sut.execute({ userId: 'non-existing-id' });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
