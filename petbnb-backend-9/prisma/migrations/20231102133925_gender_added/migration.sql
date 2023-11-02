/*
  Warnings:

  - The `gender` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE', 'NOT_SPECIFIED');

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "gender" "GenderType" DEFAULT 'NOT_SPECIFIED';

-- AlterTable
ALTER TABLE "hosts" ADD COLUMN     "gender" "GenderType" DEFAULT 'NOT_SPECIFIED';

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "gender",
ADD COLUMN     "gender" "GenderType" DEFAULT 'NOT_SPECIFIED';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "GenderType" NOT NULL DEFAULT 'NOT_SPECIFIED';
