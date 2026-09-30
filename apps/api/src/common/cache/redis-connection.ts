export type RedisConnectionOptions = {
  host: string;
  port: number;
  username?: string;
  password?: string;
  db?: number;
};

export function toRedisConnectionOptions(
  redisUrl: string,
): RedisConnectionOptions {
  const url = new URL(redisUrl);
  const dbPath = url.pathname.replace('/', '');

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 6379,
    username: url.username || undefined,
    password: url.password || undefined,
    db: dbPath ? Number(dbPath) : 0,
  };
}
