/*
  Warnings:

  - Added the required column `fees` to the `available_services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "available_services" ADD COLUMN     "fees" INTEGER NOT NULL;
