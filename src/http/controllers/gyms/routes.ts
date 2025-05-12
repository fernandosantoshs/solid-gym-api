import { app } from '@/app';
import { create } from './create';
import { verifyJwt } from '@/middlewares/verify-jwt';
import { search } from './search';
import { nearby } from './nearby';

export async function gymRoutes() {
  app.addHook('onRequest', verifyJwt);

  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);

  app.post('/gyms', create);
}
