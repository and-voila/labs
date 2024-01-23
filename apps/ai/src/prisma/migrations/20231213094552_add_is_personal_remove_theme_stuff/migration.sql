/*
  Warnings:

  - You are about to drop the column `locale` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `timeZone` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "isPersonal" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "locale",
DROP COLUMN "theme",
DROP COLUMN "timeZone";
