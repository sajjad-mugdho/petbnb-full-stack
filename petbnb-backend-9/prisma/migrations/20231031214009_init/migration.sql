/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('CAT', 'DOG', 'BOTH');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLITED');

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image_url" TEXT,
    "pet" "PetType" DEFAULT 'BOTH',
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image_url" TEXT,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hosts" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image_url" TEXT,
    "address" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "preferredPet" "PetType" NOT NULL DEFAULT 'BOTH',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_slot" (
    "id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_services" (
    "id" TEXT NOT NULL,
    "availableHostId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "slot_id" TEXT NOT NULL,
    "available_seat" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "available_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_hosts" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "available_seat" TEXT NOT NULL,
    "availableServiceId" TEXT NOT NULL,
    "avilableDate" TIMESTAMP(3) NOT NULL,
    "slot_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "available_hosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "availableHostId" TEXT,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "image_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "messages" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "availableServiceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "bookedId" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_phone_key" ON "admins"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "hosts_email_key" ON "hosts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hosts_phone_key" ON "hosts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_phone_key" ON "profiles"("phone");

-- AddForeignKey
ALTER TABLE "available_services" ADD CONSTRAINT "available_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_services" ADD CONSTRAINT "available_services_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "time_slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_hosts" ADD CONSTRAINT "available_hosts_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "hosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_hosts" ADD CONSTRAINT "available_hosts_availableServiceId_fkey" FOREIGN KEY ("availableServiceId") REFERENCES "available_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_hosts" ADD CONSTRAINT "available_hosts_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "time_slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_availableHostId_fkey" FOREIGN KEY ("availableHostId") REFERENCES "available_hosts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_availableServiceId_fkey" FOREIGN KEY ("availableServiceId") REFERENCES "available_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_bookedId_fkey" FOREIGN KEY ("bookedId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
