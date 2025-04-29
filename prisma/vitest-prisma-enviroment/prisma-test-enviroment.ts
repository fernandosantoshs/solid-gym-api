import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import type { Environment } from 'vitest/environments';

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Invalid environment variables');
  }

  const databaseUrl = new URL(process.env.DATABASE_URL);

  databaseUrl.searchParams.set('schema', schema);
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',

  async setup() {
    // Criar o banco de testes
    const schema = randomUUID();
    return {
      async teardown() {
        // Apagar o banco de testes
      },
    };
  },
};
