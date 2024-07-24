-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "status" "OrderStatusEvent" NOT NULL DEFAULT 'PENDING';
