/*
  Warnings:

  - You are about to drop the column `userId` on the `stripe_subscriptions` table. All the data in the column will be lost.
  - Made the column `teamId` on table `stripe_subscriptions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "stripe_subscriptions" DROP CONSTRAINT "stripe_subscriptions_teamId_fkey";

-- DropForeignKey
ALTER TABLE "stripe_subscriptions" DROP CONSTRAINT "stripe_subscriptions_userId_fkey";

-- DropIndex
DROP INDEX "stripe_subscriptions_userId_idx";

-- DropIndex
DROP INDEX "stripe_subscriptions_userId_key";

-- AlterTable
ALTER TABLE "stripe_subscriptions" DROP COLUMN "userId",
ALTER COLUMN "teamId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "stripe_subscriptions" ADD CONSTRAINT "stripe_subscriptions_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
