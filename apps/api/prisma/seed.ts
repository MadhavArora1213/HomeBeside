import { config as loadEnv } from 'dotenv';
loadEnv({ path: '../../.env' });
loadEnv({ path: '.env' });

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { hashPassword } from '../src/common/security/password.scrypt.js';

type PermissionSeed = {
  code: string;
  resource: string;
  action: string;
  name: string;
  description: string;
};

const PERMISSIONS: PermissionSeed[] = [
  { code: 'bookings:view', resource: 'bookings', action: 'view', name: 'View bookings', description: 'View booking records and details' },
  { code: 'bookings:create', resource: 'bookings', action: 'create', name: 'Create bookings', description: 'Create bookings on behalf of customers' },
  { code: 'bookings:update', resource: 'bookings', action: 'update', name: 'Update bookings', description: 'Edit booking details and status' },
  { code: 'bookings:cancel', resource: 'bookings', action: 'cancel', name: 'Cancel bookings', description: 'Cancel bookings' },
  { code: 'refunds:view', resource: 'refunds', action: 'view', name: 'View refunds', description: 'View refund requests' },
  { code: 'refunds:create', resource: 'refunds', action: 'create', name: 'Create refunds', description: 'Raise refunds on behalf of customers' },
  { code: 'refunds:approve', resource: 'refunds', action: 'approve', name: 'Approve refunds', description: 'Approve or reject refunds' },
  { code: 'payouts:view', resource: 'payouts', action: 'view', name: 'View payouts', description: 'View helper payout records' },
  { code: 'payouts:update', resource: 'payouts', action: 'update', name: 'Update payouts', description: 'Edit payout details' },
  { code: 'payouts:approve', resource: 'payouts', action: 'approve', name: 'Approve payouts', description: 'Approve payouts for release' },
  { code: 'helpers:view', resource: 'helpers', action: 'view', name: 'View helpers', description: 'View helper profiles and status' },
  { code: 'helpers:approve', resource: 'helpers', action: 'approve', name: 'Approve helpers', description: 'Approve helper KYC and onboarding' },
  { code: 'helpers:suspend', resource: 'helpers', action: 'suspend', name: 'Suspend helpers', description: 'Suspend helper accounts' },
  { code: 'helpers:reactivate', resource: 'helpers', action: 'reactivate', name: 'Reactivate helpers', description: 'Reactivate suspended helpers' },
  { code: 'users:view', resource: 'users', action: 'view', name: 'View users', description: 'View customer user records' },
  { code: 'users:update', resource: 'users', action: 'update', name: 'Update users', description: 'Edit user records' },
  { code: 'users:deactivate', resource: 'users', action: 'deactivate', name: 'Deactivate users', description: 'Suspend or delete user accounts' },
  { code: 'roles:view', resource: 'roles', action: 'view', name: 'View roles', description: 'View roles and their assignments' },
  { code: 'roles:manage', resource: 'roles', action: 'manage', name: 'Manage roles', description: 'Create roles and assign roles to users' },
  { code: 'permissions:view', resource: 'permissions', action: 'view', name: 'View permissions', description: 'View permission catalogue and role mappings' },
  { code: 'permissions:manage', resource: 'permissions', action: 'manage', name: 'Manage permissions', description: 'Create permissions and map them to roles' },
  { code: 'support_tickets:view', resource: 'support_tickets', action: 'view', name: 'View support tickets', description: 'View support tickets' },
  { code: 'support_tickets:respond', resource: 'support_tickets', action: 'respond', name: 'Respond to tickets', description: 'Reply to support tickets' },
  { code: 'support_tickets:close', resource: 'support_tickets', action: 'close', name: 'Close tickets', description: 'Close support tickets' },
  { code: 'coupons:view', resource: 'coupons', action: 'view', name: 'View coupons', description: 'View coupon campaigns' },
  { code: 'coupons:manage', resource: 'coupons', action: 'manage', name: 'Manage coupons', description: 'Create, edit and deactivate coupons' },
  { code: 'analytics:view', resource: 'analytics', action: 'view', name: 'View analytics', description: 'View operational analytics dashboards' },
  { code: 'audit_logs:view', resource: 'audit_logs', action: 'view', name: 'View audit logs', description: 'View security and ops audit logs' },
  { code: 'settings:view', resource: 'settings', action: 'view', name: 'View settings', description: 'View platform settings' },
  { code: 'settings:update', resource: 'settings', action: 'update', name: 'Update settings', description: 'Change platform settings' },
  { code: 'incidents:view', resource: 'incidents', action: 'view', name: 'View incidents', description: 'View incident reports' },
  { code: 'incidents:resolve', resource: 'incidents', action: 'resolve', name: 'Resolve incidents', description: 'Triage and resolve incidents' },
  { code: 'notifications:send', resource: 'notifications', action: 'send', name: 'Send notifications', description: 'Trigger platform notifications to users' },
  { code: 'sessions:view', resource: 'sessions', action: 'view', name: 'View user sessions', description: 'View active sessions of any user' },
  { code: 'sessions:revoke', resource: 'sessions', action: 'revoke', name: 'Revoke user sessions', description: 'Force logout any user session' },
];

const ALL_CODES = PERMISSIONS.map((p) => p.code);

const ROLE_MATRIX: Record<string, string[]> = {
  CUSTOMER: [
    'bookings:view',
    'bookings:create',
    'bookings:update',
    'bookings:cancel',
    'refunds:view',
    'refunds:create',
    'support_tickets:view',
    'support_tickets:respond',
  ],
  HELPER: ['bookings:view', 'support_tickets:view', 'support_tickets:respond'],
  OPS: ALL_CODES.filter((code) => !['roles:manage', 'permissions:manage', 'refunds:approve', 'payouts:approve'].includes(code)),
  ADMIN: ALL_CODES,
  SUPERADMIN: ALL_CODES,
};

const ROLES = [
  { code: 'CUSTOMER', name: 'Customer', description: 'End customer booking services for their household' },
  { code: 'HELPER', name: 'Helper', description: 'Verified helper accepting and completing tasks' },
  { code: 'OPS', name: 'Operations', description: 'Operations staff handling day to day platform work' },
  { code: 'ADMIN', name: 'Administrator', description: 'Administrator with full operational access' },
  { code: 'SUPERADMIN', name: 'Super Administrator', description: 'Super administrator managing roles and permissions' },
];

async function main(): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment before seeding');
  }

  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
  try {
    const country = await prisma.country.upsert({
      where: { isoCode: 'IN' },
      update: {},
      create: {
        isoCode: 'IN',
        name: 'India',
        currencyCode: 'INR',
        timezoneDefault: 'Asia/Kolkata',
        phoneCode: '+91',
      },
    });

    let city = await prisma.city.findFirst({ where: { countryId: country.id, name: 'Bengaluru' } });
    if (!city) {
      city = await prisma.city.create({
        data: {
          countryId: country.id,
          name: 'Bengaluru',
          stateName: 'Karnataka',
          timezone: 'Asia/Kolkata',
          latitude: 12.9716,
          longitude: 77.5946,
          status: 'ACTIVE',
        },
      });
    }

    const roleIds = new Map<string, string>();
    for (const role of ROLES) {
      const saved = await prisma.role.upsert({
        where: { code: role.code },
        update: { name: role.name, description: role.description, isActive: true },
        create: role,
      });
      roleIds.set(role.code, saved.id);
    }

    const permissionIds = new Map<string, string>();
    for (const permission of PERMISSIONS) {
      const saved = await prisma.permission.upsert({
        where: { code: permission.code },
        update: { resource: permission.resource, action: permission.action, name: permission.name, description: permission.description },
        create: permission,
      });
      permissionIds.set(permission.code, saved.id);
    }

    let mappings = 0;
    for (const [roleCode, codes] of Object.entries(ROLE_MATRIX)) {
      const roleId = roleIds.get(roleCode);
      if (!roleId) throw new Error(`Unknown role in matrix: ${roleCode}`);
      for (const code of codes) {
        const permissionId = permissionIds.get(code);
        if (!permissionId) throw new Error(`Unknown permission in matrix: ${code}`);
        const existing = await prisma.rolePermission.findUnique({
          where: { roleId_permissionId: { roleId, permissionId } },
        });
        if (!existing) {
          await prisma.rolePermission.create({ data: { roleId, permissionId } });
          mappings += 1;
        }
      }
    }

    const passwordHash = await hashPassword(adminPassword);
    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: { passwordHash, status: 'ACTIVE', deletedAt: null, emailVerifiedAt: new Date() },
      create: {
        email: adminEmail,
        phone: '+910000000000',
        passwordHash,
        firstName: 'Platform',
        lastName: 'Admin',
        countryId: country.id,
        cityId: city.id,
        timezone: 'Asia/Kolkata',
        currency: 'INR',
        status: 'ACTIVE',
        emailVerifiedAt: new Date(),
        lastLoginAt: new Date(),
      },
    });
    const adminRoleAssigned = await prisma.userRole.findUnique({
      where: { userId_roleId: { userId: admin.id, roleId: roleIds.get('ADMIN')! } },
    });
    if (!adminRoleAssigned) {
      await prisma.userRole.create({ data: { userId: admin.id, roleId: roleIds.get('ADMIN')! } });
    }

    console.log(`seed ok: roles=${ROLES.length} permissions=${PERMISSIONS.length} newMappings=${mappings} admin=${adminEmail}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
