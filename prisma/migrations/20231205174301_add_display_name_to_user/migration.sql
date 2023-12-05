/*
  Warnings:

  - A unique constraint covering the columns `[displayName]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "displayName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_displayName_key" ON "users"("displayName");
