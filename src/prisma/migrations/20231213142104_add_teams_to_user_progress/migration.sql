/*
  Warnings:

  - A unique constraint covering the columns `[teamId,chapterId]` on the table `user_progress` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_progress" ADD COLUMN     "teamId" TEXT;

-- CreateIndex
CREATE INDEX "user_progress_teamId_idx" ON "user_progress"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "user_progress_teamId_chapterId_key" ON "user_progress"("teamId", "chapterId");

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
