/*
  Warnings:

  - You are about to drop the `stripe_customers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "stripe_customers" DROP CONSTRAINT "stripe_customers_teamId_fkey";

-- DropTable
DROP TABLE "stripe_customers";
