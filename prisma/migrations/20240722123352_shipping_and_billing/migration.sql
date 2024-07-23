/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "lineTwo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "billingAddress" INTEGER,
ADD COLUMN     "shippingAddress" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
