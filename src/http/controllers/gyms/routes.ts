import { app } from '@/app';
import { create } from './create';
import { verifyJwt } from '@/middlewares/verify-jwt';
import { search } from './search';

export async function gymRoutes() {
  app.addHook('onRequest', verifyJwt);

  app.get('/gyms/search', search);

  app.post('/gyms', create);
}
