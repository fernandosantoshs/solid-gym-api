import { FastifyInstance } from 'fastify';
import { register } from './controller/register';
import { authentication } from './controller/authentication';
import { profile } from './controller/profile';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);

  /* Authenticated routes */
  app.get('/me', profile);
}
