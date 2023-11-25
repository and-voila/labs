/*
  Warnings:

  - A unique constraint covering the columns `[organizationId]` on the table `stripe_customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationId]` on the table `user_subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'BILLING');

-- CreateEnum
CREATE TYPE "GlobalRole" AS ENUM ('SUPERADMIN', 'ADMIN', 'TEACHER', 'CUSTOMER');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "sites" ADD COLUMN     "organizationId" TEXT,
ADD COLUMN     "twitterSiteOrId" TEXT;

-- AlterTable
ALTER TABLE "stripe_customers" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "user_subscriptions" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "GlobalRole" NOT NULL DEFAULT 'CUSTOMER';

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "primaryDomain" TEXT,
    "ownerId" TEXT NOT NULL,
    "logo" TEXT DEFAULT 'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/eRsvMz1-NM55IyismSKxhuL2Z7AfAEXQ7Qilts.jpeg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "MembershipRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_primaryDomain_key" ON "organizations"("primaryDomain");

-- CreateIndex
CREATE INDEX "idx_organization_owner" ON "organizations"("ownerId");

-- CreateIndex
CREATE INDEX "idx_membership_organization" ON "memberships"("organizationId");

-- CreateIndex
CREATE INDEX "idx_membership_user" ON "memberships"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_organizationId_userId_key" ON "memberships"("organizationId", "userId");

-- CreateIndex
CREATE INDEX "idx_course_user" ON "courses"("userId");

-- CreateIndex
CREATE INDEX "idx_course_organization" ON "courses"("organizationId");

-- CreateIndex
CREATE INDEX "idx_site_organization" ON "sites"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_customers_organizationId_key" ON "stripe_customers"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_organizationId_key" ON "user_subscriptions"("organizationId");

-- CreateIndex
CREATE INDEX "idx_user_subscription_user" ON "user_subscriptions"("userId");

-- CreateIndex
CREATE INDEX "idx_user_subscription_organization" ON "user_subscriptions"("organizationId");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_user_id" ON "users"("id");

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "accounts_userId_idx" RENAME TO "idx_account_user";

-- RenameIndex
ALTER INDEX "attachments_courseId_idx" RENAME TO "idx_attachment_course";

-- RenameIndex
ALTER INDEX "chapters_courseId_idx" RENAME TO "idx_chapter_course";

-- RenameIndex
ALTER INDEX "courses_categoryId_idx" RENAME TO "idx_course_category";

-- RenameIndex
ALTER INDEX "posts_siteId_idx" RENAME TO "idx_post_site";

-- RenameIndex
ALTER INDEX "posts_userId_idx" RENAME TO "idx_post_user";

-- RenameIndex
ALTER INDEX "purchases_courseId_idx" RENAME TO "idx_purchases_course";

-- RenameIndex
ALTER INDEX "sessions_userId_idx" RENAME TO "idx_session_user";

-- RenameIndex
ALTER INDEX "sites_userId_idx" RENAME TO "idx_site_user";

-- RenameIndex
ALTER INDEX "user_progress_chapterId_idx" RENAME TO "idx_user_progress_chapter";
