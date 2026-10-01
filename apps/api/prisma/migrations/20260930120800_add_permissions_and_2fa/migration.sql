/*
  Warnings:

  - You are about to alter the column `ip_address` on the `audit_logs` table. The data in that column could be lost. The data in that column will be cast from `Inet` to `Unsupported("inet")`.
  - You are about to alter the column `ip_address` on the `user_consents` table. The data in that column could be lost. The data in that column will be cast from `Inet` to `Unsupported("inet")`.
  - You are about to alter the column `ip_address` on the `user_sessions` table. The data in that column could be lost. The data in that column will be cast from `Inet` to `Unsupported("inet")`.

*/
-- AlterTable
ALTER TABLE "audit_logs" ALTER COLUMN "ip_address" SET DATA TYPE inet;

-- AlterTable
ALTER TABLE "user_consents" ALTER COLUMN "ip_address" SET DATA TYPE inet;

-- AlterTable
ALTER TABLE "user_sessions" ALTER COLUMN "ip_address" SET DATA TYPE inet;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "totp_secret" TEXT,
ADD COLUMN     "two_factor_enabled_at" TIMESTAMPTZ(3);

-- CreateTable
CREATE TABLE "permissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(100) NOT NULL,
    "resource" VARCHAR(50) NOT NULL,
    "action" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
