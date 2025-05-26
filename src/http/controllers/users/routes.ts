import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/middlewares/verify-jwt';

import { register } from './register';
import { authentication } from './authentication';
import { profile } from './profile';
import { refresh } from './refresh';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);

  app.patch('/token/refresh', refresh);

  /* Authenticated routes */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
