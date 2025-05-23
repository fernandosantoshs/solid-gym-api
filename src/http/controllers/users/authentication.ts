import { makeAuthenticationUseCase } from '@/factories/make-authentication-use-case';
import { invalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticationBodySchema.parse(request.body);

  try {
    const authenticationUseCase = makeAuthenticationUseCase();

    const { user } = await authenticationUseCase.authenticate({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      }
    );

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof invalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
