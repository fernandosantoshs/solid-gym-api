import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/middlewares/verify-jwt';

import { register } from './register';
import { authentication } from './authentication';
import { profile } from './profile';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);

  /* Authenticated routes */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
