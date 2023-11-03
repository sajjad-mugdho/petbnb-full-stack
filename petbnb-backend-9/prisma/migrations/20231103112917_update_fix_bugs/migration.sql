/*
  Warnings:

  - You are about to drop the column `password` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `city` to the `available_services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "available_services" ADD COLUMN     "city" TEXT NOT NULL,
ALTER COLUMN "isBooked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "password";
