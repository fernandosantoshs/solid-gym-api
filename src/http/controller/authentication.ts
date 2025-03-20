import { makeAuthenticationUseCase } from '@/factories/make-authentication-use-case';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticationUseCase } from '@/use-cases/authentication';
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

    await authenticationUseCase.authenticate({ email, password });
  } catch (err) {
    if (err instanceof invalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send();
}
