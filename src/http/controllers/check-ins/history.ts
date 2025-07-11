import { makeFetchCheckInsHistoryUseCase } from '@/factories/make-fetch-check-ins-history-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const fetchCheckInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = fetchCheckInsHistoryQuerySchema.parse(request.query);

  const fetchCheckInsHistoryUseCase = makeFetchCheckInsHistoryUseCase();

  const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
