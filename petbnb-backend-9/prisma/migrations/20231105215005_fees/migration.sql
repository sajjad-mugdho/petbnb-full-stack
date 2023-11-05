/*
  Warnings:

  - Made the column `gender` on table `hosts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "hosts" ALTER COLUMN "gender" SET NOT NULL;
