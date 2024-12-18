import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { hash } from 'bcrypt';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) {
    return reply.status(409).send();
  }

  const password_hash = await hash(password, 6);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });

  return reply.status(201).send();
}
