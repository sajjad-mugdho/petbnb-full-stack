/*
  Warnings:

  - Changed the type of `gender` on the `hosts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "hosts" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL;
