/*
  Warnings:

  - You are about to drop the column `availableServiceId` on the `available_hosts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "available_hosts" DROP CONSTRAINT "available_hosts_availableServiceId_fkey";

-- AlterTable
ALTER TABLE "available_hosts" DROP COLUMN "availableServiceId";

-- AddForeignKey
ALTER TABLE "available_services" ADD CONSTRAINT "available_services_availableHostId_fkey" FOREIGN KEY ("availableHostId") REFERENCES "available_hosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
