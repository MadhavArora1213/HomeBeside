import { Injectable } from '@nestjs/common';
import { CacheService } from '../common/cache/cache.service.js';
import { PrismaService } from '../common/prisma/prisma.service.js';

const CACHE_TTL_SECONDS = 120;

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async permissionsForRoles(roles: string[]): Promise<string[]> {
    const permissions = new Set<string>();
    for (const role of roles) {
      const key = `roleperms:${role}`;
      let cached = await this.cache.get(key);
      if (cached === null) {
        const rows = await this.prisma.rolePermission.findMany({
          where: { role: { code: role, isActive: true } },
          select: { permission: { select: { code: true } } },
        });
        cached = JSON.stringify(rows.map((row) => row.permission.code));
        await this.cache.set(key, cached, CACHE_TTL_SECONDS);
      }
      try {
        for (const code of JSON.parse(cached) as string[]) permissions.add(code);
      } catch {
        await this.cache.del(key);
      }
    }
    return [...permissions];
  }

  async invalidateRole(roleCode: string): Promise<void> {
    await this.cache.del(`roleperms:${roleCode}`);
  }
}
