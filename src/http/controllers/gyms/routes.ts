import { app } from '@/app';
import { create } from './create';
import { verifyJwt } from '@/middlewares/verify-jwt';

export async function gymRoutes() {
  app.addHook('onRequest', verifyJwt);

  app.post('/gyms', create);
}
