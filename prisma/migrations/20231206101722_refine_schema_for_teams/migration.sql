/*
  Warnings:

  - You are about to drop the column `organizationId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `sites` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `stripe_customers` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `stripe_subscriptions` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `OrganizationInvite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `memberships` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchases` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[teamId]` on the table `stripe_customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamId]` on the table `stripe_subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TeamMemberRole" AS ENUM ('MEMBER', 'OWNER');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIALING', 'ACTIVE', 'PAUSED', 'CANCELED', 'PAST_DUE', 'UNPAID', 'INCOMPLETE', 'EXPIRED');

-- DropForeignKey
ALTER TABLE "OrganizationInvite" DROP CONSTRAINT "OrganizationInvite_invitedUserId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationInvite" DROP CONSTRAINT "OrganizationInvite_inviterUserId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationInvite" DROP CONSTRAINT "OrganizationInvite_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_userId_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_stripeCustomerId_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_stripeSubscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_courseId_fkey";

-- DropForeignKey
ALTER TABLE "sites" DROP CONSTRAINT "sites_organizationId_fkey";

-- DropIndex
DROP INDEX "idx_attachment_course";

-- DropIndex
DROP INDEX "idx_course_organization";

-- DropIndex
DROP INDEX "idx_site_organization";

-- DropIndex
DROP INDEX "idx_stripe_customer_organization";

-- DropIndex
DROP INDEX "stripe_customers_organizationId_key";

-- DropIndex
DROP INDEX "idx_stripe_subscription_organization";

-- DropIndex
DROP INDEX "stripe_subscriptions_organizationId_key";

-- DropIndex
DROP INDEX "idx_user_id";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "organizationId",
ADD COLUMN     "teamId" TEXT;

-- AlterTable
ALTER TABLE "sites" DROP COLUMN "organizationId",
ADD COLUMN     "teamId" TEXT;

-- AlterTable
ALTER TABLE "stripe_customers" DROP COLUMN "organizationId",
ADD COLUMN     "teamId" TEXT;

-- AlterTable
ALTER TABLE "stripe_subscriptions" DROP COLUMN "organizationId",
ADD COLUMN     "status" "SubscriptionStatus",
ADD COLUMN     "teamId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "OrganizationInvite";

-- DropTable
DROP TABLE "memberships";

-- DropTable
DROP TABLE "organizations";

-- DropTable
DROP TABLE "purchases";

-- DropEnum
DROP TYPE "GlobalRole";

-- DropEnum
DROP TYPE "MembershipRole";

-- DropEnum
DROP TYPE "MembershipStatus";

-- DropEnum
DROP TYPE "OrganizationInviteStatus";

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_memberships" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "TeamMemberRole" NOT NULL DEFAULT 'MEMBER',
    "is_creator" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "team_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_invitations" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "TeamMemberRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_meta" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "author" TEXT,
    "creator" TEXT,
    "category" TEXT,
    "keywords" TEXT,
    "socialNetworkUrls" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_meta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teams_slug_key" ON "teams"("slug");

-- CreateIndex
CREATE INDEX "teams_name_idx" ON "teams"("name");

-- CreateIndex
CREATE INDEX "team_memberships_userId_idx" ON "team_memberships"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "team_memberships_teamId_userId_key" ON "team_memberships"("teamId", "userId");

-- CreateIndex
CREATE INDEX "team_invitations_email_idx" ON "team_invitations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "team_invitations_teamId_email_key" ON "team_invitations"("teamId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "site_meta_siteId_key" ON "site_meta"("siteId");

-- CreateIndex
CREATE INDEX "sites_teamId_idx" ON "sites"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_customers_teamId_key" ON "stripe_customers"("teamId");

-- CreateIndex
CREATE INDEX "stripe_customers_userId_idx" ON "stripe_customers"("userId");

-- CreateIndex
CREATE INDEX "stripe_customers_teamId_idx" ON "stripe_customers"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_subscriptions_teamId_key" ON "stripe_subscriptions"("teamId");

-- CreateIndex
CREATE INDEX "stripe_subscriptions_teamId_idx" ON "stripe_subscriptions"("teamId");

-- CreateIndex
CREATE INDEX "user_progress_userId_idx" ON "user_progress"("userId");

-- CreateIndex
CREATE INDEX "users_displayName_idx" ON "users"("displayName");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- AddForeignKey
ALTER TABLE "team_memberships" ADD CONSTRAINT "team_memberships_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_memberships" ADD CONSTRAINT "team_memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_invitations" ADD CONSTRAINT "team_invitations_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_meta" ADD CONSTRAINT "site_meta_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_subscriptions" ADD CONSTRAINT "stripe_subscriptions_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_customers" ADD CONSTRAINT "stripe_customers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "idx_account_user" RENAME TO "accounts_userId_idx";

-- RenameIndex
ALTER INDEX "idx_chapter_course" RENAME TO "chapters_courseId_idx";

-- RenameIndex
ALTER INDEX "idx_course_category" RENAME TO "courses_categoryId_idx";

-- RenameIndex
ALTER INDEX "idx_course_user" RENAME TO "courses_userId_idx";

-- RenameIndex
ALTER INDEX "idx_post_site" RENAME TO "posts_siteId_idx";

-- RenameIndex
ALTER INDEX "idx_post_user" RENAME TO "posts_userId_idx";

-- RenameIndex
ALTER INDEX "idx_session_user" RENAME TO "sessions_userId_idx";

-- RenameIndex
ALTER INDEX "idx_site_user" RENAME TO "sites_userId_idx";

-- RenameIndex
ALTER INDEX "idx_stripe_subscription_user" RENAME TO "stripe_subscriptions_userId_idx";

-- RenameIndex
ALTER INDEX "idx_user_progress_chapter" RENAME TO "user_progress_chapterId_idx";

-- RenameIndex
ALTER INDEX "idx_user_email" RENAME TO "users_email_idx";
