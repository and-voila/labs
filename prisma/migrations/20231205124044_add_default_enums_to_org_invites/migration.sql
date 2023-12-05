-- AlterTable
ALTER TABLE "OrganizationInvite" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "memberships" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
