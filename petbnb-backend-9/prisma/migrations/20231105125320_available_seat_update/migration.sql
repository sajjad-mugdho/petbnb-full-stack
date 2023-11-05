/*
  Warnings:

  - Changed the type of `available_seat` on the `available_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "available_services" DROP COLUMN "available_seat",
ADD COLUMN     "available_seat" INTEGER NOT NULL;
