import { makeGetUserProfileUseCase } from '@/factories/make-get-user-profile-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const getUserProfile = makeGetUserProfileUseCase();

  const userId = request.user.sub;

  const { user } = await getUserProfile.execute({ userId });

  return reply.status(200).send(user.email);
}
