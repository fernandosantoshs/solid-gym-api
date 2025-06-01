import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(roleToVerify: 'MEMBER' | 'ADMIN') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userRole = request.user.role;

    if (userRole !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' });
    }
  };
}
