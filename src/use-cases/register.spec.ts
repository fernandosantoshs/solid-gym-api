import { compare } from 'bcrypt';
import { RegisterUseCase } from './register';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { UsersRepository } from '@/repositories/users-repository';

let usersRepository: UsersRepository;
let sut: RegisterUseCase;

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should create a new user', async () => {
    const email = 'donlotario@email.com';

    const userRegisterReponse = await sut.execute({
      name: 'Don Lotario',
      email,
      password: 'my-password',
    });

    expect(userRegisterReponse.user).toHaveProperty('id');
    expect(userRegisterReponse.user.name).toBe('Don Lotario');
    expect(userRegisterReponse.user.email).toBe(email);
  });

  it('should not be able to create a new user with an existing email', async () => {
    const email = 'donlotario@email.com';

    await sut.execute({
      name: 'Don Lotario',
      email,
      password: 'my-password',
    });

    await expect(async () => {
      await sut.execute({
        name: 'Don Lotario',
        email,
        password: 'my-password2',
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should hash the password', async () => {
    const { user } = await sut.execute({
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
