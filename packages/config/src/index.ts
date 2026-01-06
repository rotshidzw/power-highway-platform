import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  API_PORT: z.string().default('3001'),
  WEB_PORT: z.string().default('3000'),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;

export const loadEnv = (env: NodeJS.ProcessEnv): Env => envSchema.parse(env);
