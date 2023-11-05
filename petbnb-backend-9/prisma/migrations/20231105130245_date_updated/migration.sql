/*
  Warnings:

  - Added the required column `available_date` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "available_date" TIMESTAMP(3) NOT NULL;
