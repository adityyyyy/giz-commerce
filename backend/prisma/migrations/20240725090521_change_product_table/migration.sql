/*
  Warnings:

  - Added the required column `brand` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "numReviews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating" DECIMAL(65,30) NOT NULL DEFAULT 0;
