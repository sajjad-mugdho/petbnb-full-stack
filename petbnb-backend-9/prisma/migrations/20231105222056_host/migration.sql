/*
  Warnings:

  - Added the required column `gender` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL;
