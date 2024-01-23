/*
  Warnings:

  - You are about to drop the `user_api_limits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_api_limits" DROP CONSTRAINT "user_api_limits_userId_fkey";

-- DropTable
DROP TABLE "user_api_limits";

-- CreateTable
CREATE TABLE "team_api_limits" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "team_api_limits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_api_limits_teamId_key" ON "team_api_limits"("teamId");

-- AddForeignKey
ALTER TABLE "team_api_limits" ADD CONSTRAINT "team_api_limits_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
