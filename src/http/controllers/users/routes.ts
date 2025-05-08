import { FastifyInstance } from 'fastify';
import { register } from './register';
import { authentication } from './authentication';
import { profile } from './profile';
import { verifyJwt } from '@/middlewares/verify-jwt';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);

  /* Authenticated routes */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
