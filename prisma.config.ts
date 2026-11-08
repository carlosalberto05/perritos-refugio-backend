import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Migrations use DIRECT_URL (Supabase direct connection) when available.
    url: process.env.DIRECT_URL ?? env('DATABASE_URL'),
  },
});
