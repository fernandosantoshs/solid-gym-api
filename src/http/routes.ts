import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';
import { authentication } from './controllers/authentication';
import { profile } from './controllers/profile';
import { verifyJwt } from '@/middlewares/verify-jwt';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);

  /* Authenticated routes */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
