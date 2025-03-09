// Fazer teste de hash de password

import { compare } from 'bcrypt';
import { RegisterUseCase } from './register';
import { describe, expect, it } from 'vitest';

describe('Register use case', () => {
  it('should hash the password', async () => {
    const usersRepository = {
      async findByEmail(email: string) {
        return null;
      },

      async create(data: any) {
        return {
          id: 'id-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    };

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
