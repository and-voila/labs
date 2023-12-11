/*
  Warnings:

  - A unique constraint covering the columns `[userId,teamId]` on the table `memberships` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "memberships_teamId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "memberships_userId_teamId_key" ON "memberships"("userId", "teamId");
