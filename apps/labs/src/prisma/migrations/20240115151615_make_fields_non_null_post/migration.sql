/*
  Warnings:

  - Made the column `title` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `sites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `sites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamId` on table `sites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamId` on table `stripe_customers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "sites" DROP CONSTRAINT "sites_teamId_fkey";

-- DropForeignKey
ALTER TABLE "stripe_customers" DROP CONSTRAINT "stripe_customers_teamId_fkey";

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "sites" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "teamId" SET NOT NULL;

-- AlterTable
ALTER TABLE "stripe_customers" ALTER COLUMN "teamId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_customers" ADD CONSTRAINT "stripe_customers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
