import { FastifyReply, FastifyRequest } from 'fastify';

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const { role, sub } = request.user;

  const token = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub,
        expiresIn: '7d',
      },
    }
  );

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true,
    })
    .status(200)
    .send({ token });
}
