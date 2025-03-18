import { FastifyInstance } from 'fastify';
import { register } from './controller/register';
import { authentication } from './controller/authentication';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);
}
