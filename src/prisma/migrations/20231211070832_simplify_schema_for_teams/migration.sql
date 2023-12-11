/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `team_invitations` table. All the data in the column will be lost.
  - You are about to drop the column `inviteeName` on the `team_invitations` table. All the data in the column will be lost.
  - The `role` column on the `team_invitations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `isPrimary` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `team_memberships` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expires` to the `team_invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamSlug` to the `team_invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `team_invitations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('MEMBER', 'ADMIN', 'OWNER');

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_teamId_fkey";

-- DropForeignKey
ALTER TABLE "team_memberships" DROP CONSTRAINT "team_memberships_teamId_fkey";

-- DropForeignKey
ALTER TABLE "team_memberships" DROP CONSTRAINT "team_memberships_userId_fkey";

-- DropIndex
DROP INDEX "team_invitations_email_idx";

-- DropIndex
DROP INDEX "teams_name_idx";

-- DropIndex
DROP INDEX "users_role_idx";

-- AlterTable
ALTER TABLE "team_invitations" DROP COLUMN "expiresAt",
DROP COLUMN "inviteeName",
ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "teamSlug" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "MembershipRole" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "isPrimary";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'system',
ADD COLUMN     "timeZone" TEXT NOT NULL DEFAULT 'Europe/Berlin',
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "team_memberships";

-- DropEnum
DROP TYPE "TeamMemberRole";

-- CreateTable
CREATE TABLE "memberships" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "role" "MembershipRole" NOT NULL DEFAULT 'MEMBER',
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "memberships_teamId_idx" ON "memberships"("teamId");

-- CreateIndex
CREATE INDEX "memberships_userId_idx" ON "memberships"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_teamId_userId_key" ON "memberships"("teamId", "userId");

-- CreateIndex
CREATE INDEX "teams_name_slug_idx" ON "teams"("name", "slug");

-- CreateIndex
CREATE INDEX "teams_slug_idx" ON "teams"("slug");

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
