import { verifyJwt } from '@/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { create } from './create';
import { history } from './history';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/check-ins/history', history);

  app.post('/gyms/:gymId/check-in', create);
}
