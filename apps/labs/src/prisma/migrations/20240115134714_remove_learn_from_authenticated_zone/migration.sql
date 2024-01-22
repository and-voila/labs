/*
  Warnings:

  - You are about to drop the column `discordAvatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `discordId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `discordServerMember` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `discordUsername` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `attachments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chapters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mux-data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team_api_limits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_courseId_fkey";

-- DropForeignKey
ALTER TABLE "chapters" DROP CONSTRAINT "chapters_courseId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "mux-data" DROP CONSTRAINT "mux-data_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "team_api_limits" DROP CONSTRAINT "team_api_limits_teamId_fkey";

-- DropForeignKey
ALTER TABLE "user_progress" DROP CONSTRAINT "user_progress_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "user_progress" DROP CONSTRAINT "user_progress_teamId_fkey";

-- DropIndex
DROP INDEX "users_discordId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "discordAvatar",
DROP COLUMN "discordId",
DROP COLUMN "discordServerMember",
DROP COLUMN "discordUsername",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "attachments";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "chapters";

-- DropTable
DROP TABLE "courses";

-- DropTable
DROP TABLE "mux-data";

-- DropTable
DROP TABLE "team_api_limits";

-- DropTable
DROP TABLE "user_progress";
