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
ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL;
