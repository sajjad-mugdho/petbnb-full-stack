/*
  Warnings:

  - The `gender` column on the `admins` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "gender",
ADD COLUMN     "gender" "GenderType" NOT NULL DEFAULT 'NOT_SPECIFIED';
