import { compare } from 'bcrypt';
import { RegisterUseCase } from './register';
import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register use case', () => {
  it('should create a new user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = 'donlotario@email.com';

    const userRegisterReponse = await registerUseCase.execute({
      name: 'Don Lotario',
      email,
      password: 'my-password',
    });

    expect(userRegisterReponse.user).toHaveProperty('id');
    expect(userRegisterReponse.user.name).toBe('Don Lotario');
    expect(userRegisterReponse.user.email).toBe(email);
  });

  it('should not be able to create a new user with an existing email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = 'donlotario@email.com';

    await registerUseCase.execute({
      name: 'Don Lotario',
      email,
      password: 'my-password',
    });

    await expect(async () => {
      await registerUseCase.execute({
        name: 'Don Lotario',
        email,
        password: 'my-password2',
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should hash the password', async () => {
    const usersRepository = new InMemoryUsersRepository();

    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'Don Lotario',
      email: 'donlotario@email.com',
      password: 'unhashed-password',
    });

    const isPasswordCorrectlyHashed = await compare(
      'unhashed-password',
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
