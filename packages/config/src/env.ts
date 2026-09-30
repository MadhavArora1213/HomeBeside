import { z } from "zod";

export const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  API_PREFIX: z.string().default("api/v1"),
});

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_MAPS_API_KEY: z.string().min(1).optional(),
});

export function parseServerEnv(env: NodeJS.ProcessEnv = process.env) {
  return serverEnvSchema.parse(env);
}

export function parsePublicEnv(env: Record<string, string | undefined> = {}) {
  return publicEnvSchema.parse(env);
}
