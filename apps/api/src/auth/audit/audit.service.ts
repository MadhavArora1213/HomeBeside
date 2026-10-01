import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

export type AuditInput = {
  actorUserId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  newValues?: Record<string, unknown>;
  ipAddress?: string | null;
  userAgent?: string | null;
};

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async record(input: AuditInput): Promise<void> {
    try {
      const ip = input.ipAddress && /^[0-9a-fA-F:.]+$/.test(input.ipAddress) ? input.ipAddress : null;
      const values = input.newValues ? JSON.stringify(input.newValues) : null;
      await this.prisma.$executeRaw`INSERT INTO audit_logs (actor_user_id, action, entity_type, entity_id, new_values, ip_address, user_agent)
        VALUES (${input.actorUserId ?? null}, ${input.action}, ${input.entityType}, ${input.entityId ?? null}, ${values}::jsonb, ${ip}::inet, ${input.userAgent ?? null})`;
    } catch {
      console.warn(`audit record failed for action=${input.action}`);
    }
  }
}
