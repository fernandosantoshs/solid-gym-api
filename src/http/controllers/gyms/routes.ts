import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/middlewares/verify-jwt';
import { verifyUserRole } from '@/middlewares/verify-user-role';

import { create } from './create';
import { search } from './search';
import { nearby } from './nearby';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create);
}
