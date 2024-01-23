/*
  Warnings:

  - You are about to drop the column `inviteCode` on the `organizations` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('INVITED', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "OrganizationInviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED');

-- DropIndex
DROP INDEX "organizations_inviteCode_key";

-- AlterTable
ALTER TABLE "memberships" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "invitedAt" TIMESTAMP(3),
ADD COLUMN     "joinedAt" TIMESTAMP(3),
ADD COLUMN     "status" "MembershipStatus";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "inviteCode";

-- CreateTable
CREATE TABLE "OrganizationInvite" (
    "id" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "invitedUserId" TEXT,
    "inviterUserId" TEXT NOT NULL,
    "status" "OrganizationInviteStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationInvite_inviteCode_key" ON "OrganizationInvite"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationInvite_invitedUserId_key" ON "OrganizationInvite"("invitedUserId");

-- CreateIndex
CREATE INDEX "idx_organization_invite_organization" ON "OrganizationInvite"("organizationId");

-- CreateIndex
CREATE INDEX "idx_organization_invite_invited_user" ON "OrganizationInvite"("invitedUserId");

-- CreateIndex
CREATE INDEX "idx_organization_invite_inviter_user" ON "OrganizationInvite"("inviterUserId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationInvite_organizationId_email_key" ON "OrganizationInvite"("organizationId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationInvite_organizationId_invitedUserId_key" ON "OrganizationInvite"("organizationId", "invitedUserId");

-- AddForeignKey
ALTER TABLE "OrganizationInvite" ADD CONSTRAINT "OrganizationInvite_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationInvite" ADD CONSTRAINT "OrganizationInvite_invitedUserId_fkey" FOREIGN KEY ("invitedUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationInvite" ADD CONSTRAINT "OrganizationInvite_inviterUserId_fkey" FOREIGN KEY ("inviterUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
