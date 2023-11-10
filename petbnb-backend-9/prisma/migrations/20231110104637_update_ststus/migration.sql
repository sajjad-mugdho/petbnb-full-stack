/*
  Warnings:

  - The `status` column on the `booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `paymentStatus` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'pending';

-- DropEnum
DROP TYPE "PaymentStatus";
