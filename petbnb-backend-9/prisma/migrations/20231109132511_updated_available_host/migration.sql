/*
  Warnings:

  - You are about to drop the column `availableHostId` on the `reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_availableHostId_fkey";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "availableHostId";
