import 'dotenv/config';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import type { Environment } from 'vitest/environments';

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Invalid environment variables');
  }

  const databaseUrl = new URL(process.env.DATABASE_URL);

  databaseUrl.searchParams.set('schema', schema);

  return databaseUrl.toString();
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',

  async setup() {
    const schema = randomUUID();
    const databaseUrl = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseUrl;

    execSync('npx prisma migrate deploy');

    return {
      async teardown() {
        // Apagar o banco de testes
      },
    };
  },
};
