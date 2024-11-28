import { PrismaClient } from '@prisma/client';
import { fastify } from 'fastify';

export const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({ data: { name: 'DevUser', email: 'devemail@dev.com' } });
